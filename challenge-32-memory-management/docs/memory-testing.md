# Memory Testing Guide

## Overview
This guide explains how to run memory snapshots, interpret results, and identify common leak patterns in Node.js applications.

## Capturing Heap Snapshots

### Using the CLI
```bash
# Capture a heap snapshot
node backend/src/index.js snapshot

# Capture a heap snapshot with custom filename
node backend/src/index.js snapshot --output my-snapshot.heapsnapshot
```

### Using Node.js Inspector
1. Start the application with inspector enabled:
```bash
node --inspect backend/src/index.js start
```

2. Open Chrome DevTools and navigate to the Memory tab
3. Click "Take heap snapshot"
4. Save the snapshot for analysis

## Interpreting Heap Snapshots

### Key Metrics
- **Shallow Size**: Memory size of the object itself
- **Retained Size**: Memory size freed when the object is deleted
- **Distance**: Distance from root in the GC graph

### Common Leak Patterns

#### 1. Detached DOM Elements
- Look for objects with high retained size but no obvious references
- Check for DOM elements that are no longer in the document

#### 2. Event Listener Leaks
- Multiple listeners attached to the same event
- Listeners not removed when objects are destroyed

#### 3. Closure Leaks
- Large objects captured in closures
- Closures preventing garbage collection

#### 4. Timers and Intervals
- SetInterval callbacks holding references
- Timeouts not cleared properly

## Analyzing Memory Usage

### Memory Growth Patterns
- **Linear Growth**: Consistent memory increase over time
- **Exponential Growth**: Rapid memory increase
- **Sawtooth Pattern**: Regular allocation and deallocation

### Identifying Leaks
1. Take multiple snapshots over time
2. Compare object counts between snapshots
3. Look for consistently growing object types
4. Examine object retainers to find the root cause

## Best Practices

### 1. Regular Monitoring
- Capture snapshots during different application phases
- Monitor memory usage during load testing
- Set up automated memory monitoring

### 2. Proper Cleanup
- Remove event listeners when objects are destroyed
- Clear intervals and timeouts
- Nullify references to large objects

### 3. Object Pooling
- Reuse objects instead of creating new ones
- Implement proper pool management
- Monitor pool sizes to prevent excessive memory usage

### 4. Memory Profiling
- Profile during development and testing
- Profile under realistic load conditions
- Compare profiles before and after optimizations