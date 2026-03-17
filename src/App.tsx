import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import ChatPage from "./pages/Chat";
import AdminGroupInfoPage from "./pages/AdminGroupInfo";
import UserGroupInfoPage from "./pages/UserGroupInfo";
import ProfilePage from "./pages/Profile";
import CreateGroupPage from "./pages/CreateGroup";
import ApiIntegrationPage from "./pages/ApiIntegration";
import SpamMessagesPage from "./pages/SpamMessages";
import KnowledgeBasePage from "./pages/KnowledgeBase";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Login */}
          <Route path="/" element={<LoginPage />} />
          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* Chat */}
          <Route path="/chat/:groupId" element={<ChatPage />} />
          {/* Group Info */}
          <Route path="/group-info-admin/:groupId" element={<AdminGroupInfoPage />} />
          <Route path="/group-info-user/:groupId" element={<UserGroupInfoPage />} />
          {/* Profile */}
          <Route path="/profile" element={<ProfilePage />} />
          {/* Create Group */}
          <Route path="/create-group" element={<CreateGroupPage />} />
          {/* API Integration */}
          <Route path="/api-integration/:groupId" element={<ApiIntegrationPage />} />
          <Route path="/api-integration" element={<ApiIntegrationPage />} />
          {/* Spam */}
          <Route path="/spam/:groupId" element={<SpamMessagesPage />} />
          {/* Knowledge Base */}
          <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
