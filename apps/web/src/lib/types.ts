export type Webpage = {
  url: string;
  message_id?: string;
  created: string;
};

export type Message = {
  message_id: string;
  message: string;
  role: "USER" | "CHATBOT";
  created?: number;
};
