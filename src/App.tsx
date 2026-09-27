/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { WeatherWidget } from './components/WeatherWidget';
import { ChatThread } from './components/ChatThread';
import { ChatInput } from './components/ChatInput';
import { SpotDirectory } from './components/SpotDirectory';
import { ItineraryBuilder } from './components/ItineraryBuilder';
import { CulturalGuide } from './components/CulturalGuide';
import { TravelerProfileModal } from './components/TravelerProfileModal';
import { EventsTab } from './components/EventsTab';
import { OfflineMapsTab } from './components/OfflineMapsTab';
import { ChatMessage, TravelerProfile, AppLanguage } from './types';

const INITIAL_PROFILE: TravelerProfile = {
  style: 'Adventure & Surf',
  duration: '3-4 Days',
  primaryInterest: 'Beaches, Rice & Beans, Cahuita wildlife, Bribri cacao, cruiser biking',
  transport: 'Cruiser Bicycle',
  budgetLevel: 'Moderate',
  group: 'Couple',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'directory' | 'itinerary' | 'culture' | 'events' | 'maps'>('chat');
  const [currentLanguage, setCurrentLanguage] = useState<AppLanguage>('en');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [travelerProfile, setTravelerProfile] = useState<TravelerProfile>(INITIAL_PROFILE);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);
    setActiveTab('chat');

    try {
      // Send entire conversation history for true multi-turn context
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          userPreferences: travelerProfile,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get answer from WolabaGo');
      }

      const modelMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.text || 'No response received.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources || [],
        searchQueries: data.searchQueries || [],
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `🌴 WolabaGo notice: ${error.message || 'Could not connect to the assistant'}. If you are in AI Studio, ensure your GEMINI_API_KEY is configured in the Secrets panel.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    if (window.confirm('Start a fresh conversation with WolabaGo?')) {
      setMessages([]);
    }
  };

  const handleAskAboutSpot = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleSendItineraryToChat = (itineraryText: string) => {
    const prompt = `Here is the custom itinerary generated for my stay:\n\n${itineraryText}\n\nCan you review this, verify the timing, recommend the best authentic sodas for lunch each day, and tell me if there are any specific tide or weather precautions?`;
    handleSendMessage(prompt);
  };

  return (
    <div className="flex flex-col h-screen bg-[#07152b] text-[#f1f5f9] overflow-hidden selection:bg-[#CE1126]/30 selection:text-white">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        travelerProfile={travelerProfile}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onResetChat={handleResetChat}
        messageCount={messages.length}
      />

      {/* Real-Time Caribbean Weather Widget */}
      <WeatherWidget onAskWeatherQuestion={handleSendMessage} />

      {/* Main Tab Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <ChatThread
              messages={messages}
              isLoading={isLoading}
              onSelectPrompt={handleSendMessage}
            />
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              travelerProfile={travelerProfile}
              onOpenProfile={() => setIsProfileModalOpen(true)}
            />
          </div>
        )}

        {activeTab === 'events' && (
          <EventsTab
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
            onAskInChat={handleSendMessage}
          />
        )}

        {activeTab === 'directory' && (
          <SpotDirectory 
            onAskAboutSpot={handleAskAboutSpot} 
            onNavigateToMaps={() => setActiveTab('maps')}
          />
        )}

        {activeTab === 'itinerary' && (
          <ItineraryBuilder 
            onSendToChat={handleSendItineraryToChat} 
          />
        )}

        {activeTab === 'culture' && (
          <CulturalGuide onAskQuestion={handleSendMessage} />
        )}

        {activeTab === 'maps' && (
          <OfflineMapsTab
            currentLanguage={currentLanguage}
            onAskInChat={handleSendMessage}
          />
        )}
      </main>

      {/* Traveler Profile Customizer Modal */}
      <TravelerProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={travelerProfile}
        onSaveProfile={(newProfile) => setTravelerProfile(newProfile)}
      />
    </div>
  );
}
