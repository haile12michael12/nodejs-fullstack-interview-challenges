const http = require('http');

class AutoscalerSimulator {
  constructor() {
    this.config = {
      minReplicas: parseInt(process.env.MIN_REPLICAS) || 2,
      maxReplicas: parseInt(process.env.MAX_REPLICAS) || 10,
      targetCPU: parseInt(process.env.TARGET_CPU) || 70,
      scaleUpFactor: 1.5,
      scaleDownFactor: 0.5,
      checkInterval: parseInt(process.env.CHECK_INTERVAL) || 30000 // 30 seconds
    };
    
    this.currentReplicas = this.config.minReplicas;
    this.currentCPU = 0;
  }

  // Simulate CPU usage monitoring
  simulateCPUUsage() {
    // Simulate varying CPU usage
    this.currentCPU = Math.floor(Math.random() * 100);
    console.log(`Current CPU usage: ${this.currentCPU}%`);
    return this.currentCPU;
  }

  // Determine scaling action based on CPU usage
  determineScalingAction() {
    const cpu = this.simulateCPUUsage();
    
    if (cpu > this.config.targetCPU && this.currentReplicas < this.config.maxReplicas) {
      // Scale up
      const newReplicas = Math.min(
        this.config.maxReplicas,
        Math.ceil(this.currentReplicas * this.config.scaleUpFactor)
      );
      
      if (newReplicas > this.currentReplicas) {
        return { action: 'scaleUp', replicas: newReplicas };
      }
    } else if (cpu < this.config.targetCPU * 0.5 && this.currentReplicas > this.config.minReplicas) {
      // Scale down
      const newReplicas = Math.max(
        this.config.minReplicas,
        Math.floor(this.currentReplicas * this.config.scaleDownFactor)
      );
      
      if (newReplicas < this.currentReplicas) {
        return { action: 'scaleDown', replicas: newReplicas };
      }
    }
    
    return { action: 'noAction', replicas: this.currentReplicas };
  }

  // Scale using docker-compose
  async scaleWithDockerCompose(replicas) {
    console.log(`Scaling to ${replicas} replicas using docker-compose`);
    // In a real implementation, this would execute docker-compose commands
    // For simulation, we'll just update the replica count
    this.currentReplicas = replicas;
  }

  // Scale using API call
  async scaleWithAPI(replicas) {
    console.log(`Scaling to ${replicas} replicas using API`);
    
    const postData = JSON.stringify({
      action: 'scale',
      replicas: replicas
    });

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/scale',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    return new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          console.log(`API response: ${data}`);
          this.currentReplicas = replicas;
          resolve(data);
        });
      });

      req.on('error', reject);
      req.write(postData);
      req.end();
    });
  }

  // Run autoscaling simulation
  async run() {
    console.log('Starting autoscaler simulation...');
    
    setInterval(async () => {
      const action = this.determineScalingAction();
      
      if (action.action !== 'noAction') {
        console.log(`Taking action: ${action.action} to ${action.replicas} replicas`);
        
        // Choose scaling method (docker-compose or API)
        const useAPI = process.env.SCALE_METHOD === 'api';
        
        if (useAPI) {
          await this.scaleWithAPI(action.replicas);
        } else {
          await this.scaleWithDockerCompose(action.replicas);
        }
      } else {
        console.log('No scaling action needed');
      }
    }, this.config.checkInterval);
  }
}

// Run the simulator
const simulator = new AutoscalerSimulator();

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  process.exit(0);
});

// Start the simulation
simulator.run();