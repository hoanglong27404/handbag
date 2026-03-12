import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GEMINI_API_KEY, GEMINI_API_URL } from '../constants/config';

const INITIAL_MESSAGE = {
  id: '0',
  role: 'bot',
  text: 'Xin chào! Tôi là trợ lý túi xách cao cấp được hỗ trợ bởi Gemini AI 👜\nHãy hỏi tôi về phong cách, thương hiệu, cách bảo quản túi hoặc bất kỳ điều gì bạn muốn biết!',
};

const SYSTEM_CONTEXT =
  'Bạn là chuyên gia tư vấn túi xách cao cấp cho ứng dụng mua sắm tại Việt Nam. ' +
  'Các thương hiệu có sẵn: Bvlgari, Michael Kors, Burberry, Ferragamo, Fendi. ' +
  'Hãy trả lời bằng tiếng Việt, ngắn gọn, thân thiện và hữu ích. ';

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  const buildContents = (allMessages, userText) => {
    const history = allMessages.filter((m) => m.id !== '0');
    const contents = [];

    history.forEach((msg, idx) => {
      let text = msg.text;
      if (idx === 0 && msg.role === 'user') {
        text = SYSTEM_CONTEXT + text;
      }
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text }],
      });
    });

    const prefix = contents.length === 0 ? SYSTEM_CONTEXT : '';
    contents.push({ role: 'user', parts: [{ text: prefix + userText }] });

    return contents;
  };

  const sendMessage = async () => {
    const userText = input.trim();
    if (!userText || loading) return;

    // Kiểm tra API key
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_KEY_HERE') {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'user',
          text: userText,
        },
        {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          text: '⚠️ Chưa cấu hình API Key!\n\nVui lòng:\n1. Mở file .env\n2. Thay YOUR_KEY_HERE bằng key từ https://aistudio.google.com/app/apikey\n3. Khởi động lại ứng dụng',
        },
      ]);
      setInput('');
      return;
    }

    const userMsg = { id: Date.now().toString(), role: 'user', text: userText };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: buildContents(messages, userText),
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 512,
          },
        }),
      });

      const data = await response.json();

      let botText;
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        botText = data.candidates[0].content.parts[0].text;
      } else if (data?.error) {
        // Hiện lỗi chi tiết từ Gemini API
        const errMsg = data.error.message || 'Lỗi không xác định';
        const errCode = data.error.code || response.status;
        if (errCode === 400) {
          botText = `❌ Lỗi API (${errCode}): ${errMsg}\n\nKiểm tra lại API Key trong file .env`;
        } else if (errCode === 403) {
          botText = `❌ API Key không hợp lệ hoặc chưa được kích hoạt.\n\nVui lòng:\n1. Vào https://aistudio.google.com/app/apikey\n2. Tạo key mới\n3. Cập nhật vào file .env`;
        } else if (errCode === 429) {
          botText = `❌ Đã vượt quá giới hạn request. Vui lòng thử lại sau.`;
        } else {
          botText = `❌ Lỗi ${errCode}: ${errMsg}`;
        }
      } else {
        botText = 'Xin lỗi, tôi không thể tạo phản hồi lúc này. Vui lòng thử lại.';
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'bot', text: botText },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          text: `❌ Lỗi kết nối mạng.\n\nChi tiết: ${err.message}\n\nVui lòng kiểm tra kết nối internet và thử lại.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }) => {
    const isUser = item.role === 'user';
    return (
      <View style={[styles.msgRow, isUser ? styles.userRow : styles.botRow]}>
        {!isUser && (
          <View style={styles.botAvatar}>
            <Ionicons name="bag-handle" size={16} color="#FFF" />
          </View>
        )}
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
          <Text style={[styles.msgText, isUser ? styles.userText : styles.botText]}>
            {item.text}
          </Text>
        </View>
        {isUser && (
          <View style={styles.userAvatar}>
            <Ionicons name="person" size={16} color="#FFF" />
          </View>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={false}
      />

      {loading && (
        <View style={styles.typingRow}>
          <View style={styles.botAvatar}>
            <Ionicons name="bag-handle" size={16} color="#FFF" />
          </View>
          <View style={styles.typingBubble}>
            <ActivityIndicator size="small" color="#8B4513" />
            <Text style={styles.typingText}>Đang soạn tin...</Text>
          </View>
        </View>
      )}

      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Hỏi về túi xách..."
          placeholderTextColor="#AAA"
          value={input}
          onChangeText={setInput}
          multiline
          maxLength={500}
        />
        <Pressable
          style={[styles.sendBtn, (!input.trim() || loading) && styles.sendBtnDisabled]}
          onPress={sendMessage}
          disabled={!input.trim() || loading}
        >
          <Ionicons name="send" size={18} color="#FFF" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F6F2' },
  messageList: { padding: 16, paddingBottom: 8 },
  msgRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
    gap: 8,
  },
  userRow: { justifyContent: 'flex-end' },
  botRow: { justifyContent: 'flex-start' },
  botAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#8B4513',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#5C8A3C',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  bubble: {
    maxWidth: '72%',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  userBubble: {
    backgroundColor: '#8B4513',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  msgText: { fontSize: 14, lineHeight: 21 },
  userText: { color: '#FFF' },
  botText: { color: '#1A1A1A' },
  typingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  typingText: { fontSize: 13, color: '#888', fontStyle: 'italic' },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    padding: 12,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0E8E0',
  },
  input: {
    flex: 1,
    backgroundColor: '#F9F6F2',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1A1A1A',
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#E8D8C8',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8B4513',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: '#CCC' },
});

export default ChatbotScreen;
