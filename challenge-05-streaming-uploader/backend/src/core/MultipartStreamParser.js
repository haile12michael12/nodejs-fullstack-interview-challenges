// Streaming multipart data parser
class MultipartStreamParser {
  constructor(boundary) {
    this.boundary = Buffer.from(`--${boundary}`);
    this.endBoundary = Buffer.from(`--${boundary}--`);
    this.state = 'START';
    this.parts = [];
    this.currentPart = null;
    this.headerBuffer = Buffer.alloc(0);
    this.bodyBuffer = Buffer.alloc(0);
    this.parsingHeaders = true;
  }

  write(chunk) {
    let pos = 0;
    
    while (pos < chunk.length) {
      switch (this.state) {
        case 'START':
          // Look for the first boundary
          const boundaryIndex = this.findBoundary(chunk, pos);
          if (boundaryIndex !== -1) {
            pos = boundaryIndex + this.boundary.length;
            this.state = 'PART_HEADERS';
            this.currentPart = { headers: {}, body: Buffer.alloc(0) };
            this.parsingHeaders = true;
            this.headerBuffer = Buffer.alloc(0);
          } else {
            pos = chunk.length; // Skip this chunk
          }
          break;
          
        case 'PART_HEADERS':
          // Look for end of headers (\r\n\r\n)
          const headerEndIndex = this.findHeaderEnd(chunk, pos);
          if (headerEndIndex !== -1) {
            // Add headers to current part
            this.parseHeaders(chunk.slice(0, headerEndIndex));
            pos = headerEndIndex + 4; // Skip \r\n\r\n
            this.state = 'PART_BODY';
            this.bodyBuffer = Buffer.alloc(0);
          } else {
            // Continue accumulating headers
            pos = chunk.length;
          }
          break;
          
        case 'PART_BODY':
          // Look for next boundary
          const nextBoundaryIndex = this.findBoundary(chunk, pos);
          if (nextBoundaryIndex !== -1) {
            // Add body data to current part
            if (nextBoundaryIndex > pos) {
              this.currentPart.body = Buffer.concat([
                this.currentPart.body,
                chunk.slice(pos, nextBoundaryIndex)
              ]);
            }
            
            // Save the part
            this.parts.push(this.currentPart);
            
            pos = nextBoundaryIndex + this.boundary.length;
            this.state = 'PART_HEADERS';
            this.currentPart = { headers: {}, body: Buffer.alloc(0) };
            this.parsingHeaders = true;
          } else {
            // Add all data to body buffer
            this.currentPart.body = Buffer.concat([
              this.currentPart.body,
              chunk.slice(pos)
            ]);
            pos = chunk.length;
          }
          break;
      }
    }
  }

  findBoundary(chunk, startPos) {
    // Simple implementation - in production, you'd want a more efficient algorithm
    for (let i = startPos; i <= chunk.length - this.boundary.length; i++) {
      let match = true;
      for (let j = 0; j < this.boundary.length; j++) {
        if (chunk[i + j] !== this.boundary[j]) {
          match = false;
          break;
        }
      }
      if (match) return i;
    }
    return -1;
  }

  findHeaderEnd(chunk, startPos) {
    // Look for \r\n\r\n
    const doubleNewline = Buffer.from('\r\n\r\n');
    for (let i = startPos; i <= chunk.length - doubleNewline.length; i++) {
      let match = true;
      for (let j = 0; j < doubleNewline.length; j++) {
        if (chunk[i + j] !== doubleNewline[j]) {
          match = false;
          break;
        }
      }
      if (match) return i;
    }
    return -1;
  }

  parseHeaders(headerData) {
    const headerString = headerData.toString();
    const headerLines = headerString.split('\r\n');
    
    for (const line of headerLines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.slice(0, colonIndex).trim().toLowerCase();
        const value = line.slice(colonIndex + 1).trim();
        this.currentPart.headers[key] = value;
      }
    }
  }

  end() {
    // Return all parsed parts
    return this.parts;
  }
}

module.exports = MultipartStreamParser;