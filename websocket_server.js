import WebSocket, { WebSocketServer } from 'ws';
import { createServer } from 'http';

// Create HTTP server
const server = createServer();

// Create WebSocket server
const wss = new WebSocketServer({ server });

console.log('🚀 Flutter Theme Sync Server Starting...');

// Store connected devices
const connectedDevices = new Map();

wss.on('connection', (ws, req) => {
  console.log('📱 New device connected:', req.socket.remoteAddress);
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('📨 Received message:', data.type);
      
      switch (data.type) {
        case 'DEVICE_CONNECT':
          handleDeviceConnect(ws, data);
          break;
        case 'THEME_UPDATE':
          handleThemeUpdate(data);
          break;
        case 'USER_INTERACTION':
          console.log('👆 User interaction:', data.payload.action);
          break;
        default:
          console.log('❓ Unknown message type:', data.type);
      }
    } catch (error) {
      console.error('❌ Error parsing message:', error);
    }
  });
  
  ws.on('close', () => {
    console.log('📱 Device disconnected');
    // Remove from connected devices
    for (const [deviceId, deviceWs] of connectedDevices.entries()) {
      if (deviceWs === ws) {
        connectedDevices.delete(deviceId);
        console.log(`📱 Removed device: ${deviceId}`);
        break;
      }
    }
  });
  
  ws.on('error', (error) => {
    console.error('❌ WebSocket error:', error);
  });
});

function handleDeviceConnect(ws, data) {
  const deviceId = data.payload.deviceId;
  connectedDevices.set(deviceId, ws);
  
  console.log(`✅ Device connected: ${deviceId}`);
  console.log(`📊 Total connected devices: ${connectedDevices.size}`);
  
  // Send connection confirmation
  ws.send(JSON.stringify({
    type: 'CONNECTION_ESTABLISHED',
    payload: { deviceId },
    timestamp: Date.now()
  }));
  
  // Send initial theme
  ws.send(JSON.stringify({
    type: 'THEME_UPDATE',
    payload: {
      colors: {
        primary: '#6366F1',
        onPrimary: '#FFFFFF',
        secondary: '#EC4899',
        onSecondary: '#FFFFFF',
        surface: '#FFFFFF',
        onSurface: '#000000',
        background: '#F5F5F5',
        onBackground: '#000000',
        primaryContainer: '#E0E7FF',
        onPrimaryContainer: '#1E1B4B',
        secondaryContainer: '#FCE7F3',
        onSecondaryContainer: '#831843',
      },
      isDark: false,
      themeName: 'Material Blue Theme'
    },
    timestamp: Date.now()
  }));
}

function handleThemeUpdate(data) {
  console.log('🎨 Broadcasting theme update to all devices');
  
  // Broadcast to all connected devices
  connectedDevices.forEach((ws, deviceId) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    }
  });
}

// Simulate theme changes for testing
setInterval(() => {
  if (connectedDevices.size > 0) {
    const colors = [
      { primary: '#F59E0B', name: 'Amber Theme' },
      { primary: '#10B981', name: 'Emerald Theme' },
      { primary: '#3B82F6', name: 'Blue Theme' },
      { primary: '#8B5CF6', name: 'Violet Theme' },
      { primary: '#EF4444', name: 'Red Theme' },
    ];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const themeUpdate = {
      type: 'THEME_UPDATE',
      payload: {
        colors: {
          primary: randomColor.primary,
          onPrimary: '#FFFFFF',
          secondary: '#EC4899',
          onSecondary: '#FFFFFF',
          surface: '#FFFFFF',
          onSurface: '#000000',
          background: '#F5F5F5',
          onBackground: '#000000',
        },
        isDark: false,
        themeName: randomColor.name
      },
      timestamp: Date.now()
    };
    
    console.log(`🔄 Auto-updating theme to: ${randomColor.name}`);
    handleThemeUpdate(themeUpdate);
  }
}, 10000); // Change theme every 10 seconds for demo

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`✅ Flutter Theme Sync Server running on port ${PORT}`);
  console.log(`🔗 WebSocket URL: ws://localhost:${PORT}`);
  console.log(`📱 Connect your Flutter app to test real-time theme sync!`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  wss.close(() => {
    server.close(() => {
      console.log('✅ Server closed gracefully');
      process.exit(0);
    });
  });
});
