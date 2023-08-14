export class Github {
  //information required to send a request
  constructor() {
    this.client_id = "02b3a61141b30eeb4202";
    this.client_secret = "27e619be42cad87c98c7961d6bdbf3dd82f96ca5";
    this.per_page = 10;
    this.sort = "asc";
  }

  //fetching user information from API
  async fetchUser(username) {
    const profileRes = await fetch(
      `https://api.github.com/users/${username}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    //fetching user repos from API
    const repoRes = await fetch(
      `https://api.github.com/users/${username}/repos?client_id=${this.client_id}&client_secret=${this.client_secret}&sort=${this.sort}&per_page=${this.per_page}`
    );

    const data = await profileRes.json();
    const repos = await repoRes.json();

    return { data, repos };
  }
}
