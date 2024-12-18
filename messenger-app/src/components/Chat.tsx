import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import useFetchUsers from "../hooks/useFetchUsers";
import websocketService from "../services/websocket";
import eventEmitter from "../services/eventEmitter";
import { User, Message } from "../types";
import useLogin from "../hooks/useLogin";
import chatService from "../services/chat";
import useFetchMessages from "../hooks/useFetchMessages";

const getKey = (sender: string, receiver: string) => {
  const participants = [sender, receiver];
  participants.sort();
  return participants.join("_");
};

const ChatView = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const { getAll, error } = useFetchUsers();
  const { getAll: getAllMessages } = useFetchMessages();
  const { user: loggedInUser } = useLogin((state) => ({
    user: state.user,
  }));

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAll();
      setUsers(users);
      setFilteredUsers(users);
    };
    fetchUsers();

    websocketService.connect("http://localhost:5002");

    const messageHandler = (newMessage: string) => {
      console.log("Message received in component:", newMessage);
      try {
        const parsedMessage = JSON.parse(newMessage);
        if (parsedMessage.sender && parsedMessage.message) {
          setMessages((prevMessages) => [...prevMessages, parsedMessage]);
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    eventEmitter.on("newMessage", messageHandler);

    return () => {
      eventEmitter.removeListener("newMessage", messageHandler);
    };
  }, [getAll]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!loggedInUser || !selectedUser) return;
      const messages = await getAllMessages(
        loggedInUser.username,
        selectedUser.username
      );
      setMessages(messages);
    };
    fetchMessages();
  }, [selectedUser, loggedInUser, getAllMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!selectedUser || !loggedInUser || !newMessage.trim()) return;

    const messageObject = {
      id: getKey(loggedInUser.username, selectedUser.username),
      sender: loggedInUser.username,
      receiver: selectedUser.username,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      await chatService.post("/chat/messages", {
        message: JSON.stringify(messageObject),
      });
      websocketService.sendMessage(JSON.stringify(messageObject));
      // setMessages((prev) => [...prev, messageObject]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ p: 2 }}>
      <Box display="flex" height="100vh" bgcolor="background.paper">
        <Box
          width="25%"
          bgcolor="white"
          p={2}
          borderRight={1}
          borderColor="divider"
          sx={{ overflowY: "auto" }}
        >
          {error && (
            <Box color="error.main" mb={2}>
              {error}
            </Box>
          )}
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search users..."
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase();
              setFilteredUsers(
                users.filter((user) =>
                  user.username.toLowerCase().includes(searchTerm.trim())
                )
              );
            }}
            sx={{ mb: 2 }}
          />
          <List>
            {filteredUsers.map((user) => (
              <ListItemButton
                key={user.username}
                onClick={() => setSelectedUser(user)}
                selected={selectedUser?.username === user.username}
              >
                <ListItemText primary={user.username} />
              </ListItemButton>
            ))}
          </List>
        </Box>
        <Box flex={1} display="flex" flexDirection="column">
          <Box flex={1} p={2} sx={{ overflowY: "auto", bgcolor: "white" }}>
            {!selectedUser ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                flexDirection="column"
              >
                <Typography variant="h6">Hola 👋</Typography>
                <Typography variant="body1">
                  Click on a user name to start chatting
                </Typography>
              </Box>
            ) : (
              <>
                {messages.map((msg, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent:
                        msg.sender === loggedInUser?.username
                          ? "flex-end"
                          : "flex-start",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        padding: 1,
                        backgroundColor:
                          msg.sender === loggedInUser?.username
                            ? "#1976d2"
                            : "#e3f2fd",
                        color:
                          msg.sender === loggedInUser?.username
                            ? "white"
                            : "black",
                        borderRadius: 1,
                        maxWidth: "60%",
                        wordWrap: "break-word",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {msg.message}
                    </Typography>
                  </Box>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </Box>
          {selectedUser && (
            <Box
              display="flex"
              p={2}
              borderTop={1}
              borderColor="divider"
              bgcolor="white"
            >
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
              <Button
                variant="contained"
                onClick={handleSendMessage}
                sx={{ ml: 1, bgcolor: "#1976d2", color: "white" }}
              >
                Send
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ChatView;
