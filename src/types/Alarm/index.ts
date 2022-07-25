export interface AlarmProps {
  createdAt: Date;
  type: number;
  fromUser: null | fromUser;
  isRead: boolean;
}

interface fromUser {
  no: number;
  nickname: string;
}
