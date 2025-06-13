// Test script to check the User Management API endpoints
const API_BASE = 'http://localhost:3000/api';

async function fetchWithAuth(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    return { success: response.ok, status: response.status, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function testUserAPI() {
  console.log('=== Testing User Management API ===\n');
  
  // Test 1: Get list of users
  console.log('Test 1: Get list of users');
  const usersResult = await fetchWithAuth(`${API_BASE}/users?page=1&limit=10`);
  console.log(`Status: ${usersResult.status}, Success: ${usersResult.success}`);
  console.log('Data structure:', JSON.stringify(usersResult.data, null, 2).substring(0, 300) + '...');
  console.log('-------------------\n');
  
  // Get first user if available
  let testUserId = null;
  if (usersResult.success && usersResult.data && usersResult.data.users && usersResult.data.users.length > 0) {
    testUserId = usersResult.data.users[0].id;
  }
  
  if (testUserId) {
    // Test 2: Get a specific user
    console.log(`Test 2: Get user with ID ${testUserId}`);
    const userResult = await fetchWithAuth(`${API_BASE}/users/${testUserId}`);
    console.log(`Status: ${userResult.status}, Success: ${userResult.success}`);
    console.log('Data structure:', JSON.stringify(userResult.data, null, 2).substring(0, 300) + '...');
    console.log('-------------------\n');
    
    // Test 3: Get user roles
    console.log(`Test 3: Get roles for user with ID ${testUserId}`);
    const rolesResult = await fetchWithAuth(`${API_BASE}/users/${testUserId}/roles`);
    console.log(`Status: ${rolesResult.status}, Success: ${rolesResult.success}`);
    console.log('Data structure:', JSON.stringify(rolesResult.data, null, 2).substring(0, 300) + '...');
    console.log('-------------------\n');
    
    // Test 4: Get user permissions
    console.log(`Test 4: Get permissions for user with ID ${testUserId}`);
    const permissionsResult = await fetchWithAuth(`${API_BASE}/users/${testUserId}/permissions`);
    console.log(`Status: ${permissionsResult.status}, Success: ${permissionsResult.success}`);
    console.log('Data structure:', JSON.stringify(permissionsResult.data, null, 2).substring(0, 300) + '...');
    console.log('-------------------\n');
  }
  
  // Test 5: Get roles
  console.log('Test 5: Get all roles');
  const allRolesResult = await fetchWithAuth(`${API_BASE}/roles`);
  console.log(`Status: ${allRolesResult.status}, Success: ${allRolesResult.success}`);
  console.log('Data structure:', JSON.stringify(allRolesResult.data, null, 2).substring(0, 300) + '...');
  console.log('-------------------\n');
  
  // Test 6: Get permissions
  console.log('Test 6: Get all permissions');
  const allPermissionsResult = await fetchWithAuth(`${API_BASE}/permissions`);
  console.log(`Status: ${allPermissionsResult.status}, Success: ${allPermissionsResult.success}`);
  console.log('Data structure:', JSON.stringify(allPermissionsResult.data, null, 2).substring(0, 300) + '...');
  console.log('-------------------\n');
}

// Run the tests
console.log('Starting API tests...');
testUserAPI().then(() => {
  console.log('Tests completed.');
});
