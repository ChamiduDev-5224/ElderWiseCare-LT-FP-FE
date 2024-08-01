export interface Service {
    id: string;
    des: string; // Description
  }
  
  export interface Card {
    id: number;
    tit: string; // Title
    imu: string; // Image URL
    des: string; // Description
    services: Service[];
    gid: number; // Gig ID
  }
  
  export interface UserInfo {
    id: number;
    userImg: string; // User image URL
    userName: string; // User name
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    street: string;
    city: string;
    userId: string; // Caregiver ID
  }


  export interface Chat {
    id: string;
    name: string;
    lastMessage: string;
    timestamp: string;
    profilePicture: string;
}

