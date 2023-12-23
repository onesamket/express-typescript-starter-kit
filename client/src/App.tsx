import { useEffect, useState } from 'react';
import { ClientSocket } from './socket';
import toast from 'react-hot-toast';

function App() {
  const [username, setUsername] = useState(''); // State for username
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Connect to the Socket.IO server when the component mounts
    ClientSocket.connect();
    // Listen for incoming messages
    ClientSocket.on('message', (data) => {
      setMessage(`${data.username}: ${data.text}`);
    });

    // Listen for leave events
    ClientSocket.on('leave', (msg) => {
      toast.success(msg);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      ClientSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    // Emit the "message" event to the server with username and text
    ClientSocket.emit('message', { username, text });
  };


  return (
    <div>
      {/* Input field for username */}
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {/* Input field for message */}
      <input
        type="text"
        placeholder="Write a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      {message}
    </div>
  );
}

export default App;
