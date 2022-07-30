export interface AlarmProps {
  no: number;
  createdAt: Date;
  type: number;
  fromUser: null | fromUser;
  isRead: boolean;
  food?: Food;
}

interface fromUser {
  no: number;
  nickname: string;
}

interface Food {
  no: number;
  name: string;
}
