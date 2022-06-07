export enum LobbyGameStartMode {
  demo,
  real,
}

export type LeaderboardItem = {
  id: number;
  position: number;
  name: string;
  username: string;
  avatarSrc: string;
  prize: number;
};
