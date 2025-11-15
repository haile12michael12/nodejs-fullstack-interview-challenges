// Simple test script to verify the microservice mesh
async function testMicroserviceMesh() {
  try {
    console.log('Testing Microservice Mesh...');
    
    // Test gateway health
    const gatewayHealth = await fetch('http://localhost:3000/health');
    console.log('Gateway Health:', gatewayHealth.status, await gatewayHealth.json());
    
    // Test user service health
    const userServiceHealth = await fetch('http://localhost:3001/health');
    console.log('User Service Health:', userServiceHealth.status, await userServiceHealth.json());
    
    // Test creating a user
    const newUser = {
      name: 'Test User',
      email: 'test@example.com'
    };
    
    const createUserResponse = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });
    
    console.log('Create User Response:', createUserResponse.status, await createUserResponse.json());
    
    // Test getting users
    const getUsersResponse = await fetch('http://localhost:3000/api/users');
    console.log('Get Users Response:', getUsersResponse.status, await getUsersResponse.json());
    
    console.log('Test completed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
testMicroserviceMesh();