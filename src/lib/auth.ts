type DummyUser = {
  username: string;
  password: string;
};

// Mock database with one test user
let dummyUsers: DummyUser[] = [
  // { username: 'demouser', password: 'demou' } // Pre-defined test user
];

export const dummyAuth = {
  register: (username: string, password: string) => {
    if (username.length < 8) throw new Error("Username must be ≥8 characters");
    if (password !== username.substring(0, 5) + "@123") {
      throw new Error("Password must match first 5 chars of username + '@123'");
    }

    dummyUsers.push({ username, password });
    sessionStorage.setItem("dummyAuth", JSON.stringify({ username }));
    return true;
  },

  login: (username: string, password: string) => {
    // Auto-create user if none exists (for testing)
    if (dummyUsers.length === 0) {
      if (username.length < 8) {
        throw new Error("Username must be ≥ 8 characters");
      }
      const expectedPassword = username.substring(0, 5) + "@123";

    //   console.log("Password = " + expectedPassword);

      dummyUsers.push({ username, password: expectedPassword });
    }

    const user = dummyUsers.find((u) => u.username === username);
    if (!user) return false;

    // For testing: Accept if password matches first 5 chars +'@123' OR exact test user password
    const isValidPassword =
      password === user.password ||
      password === username.substring(0, 5) + "@123";

    if (!isValidPassword) return false;

    const sessionData = JSON.stringify({ username });

    // Store session data in sessionStorage (for client use)
    sessionStorage.setItem("dummyAuth", sessionData);

    // Store session data in cookies (for middleware/server use)
    document.cookie = `dummyAuth=${encodeURIComponent(
      sessionData
    )}; path=/; max-age=86400`;

    return true;
  },

  logout: () => {
    sessionStorage.removeItem("dummyAuth");

    // Clear cookie
    document.cookie = "dummyAuth=; path=/; max-age=0";
  },

  isAuthenticated: () => {
    if (typeof window === "undefined") return false;
    console.log("loggedIn =" + !!sessionStorage.getItem("dummyAuth"));
    return !!sessionStorage.getItem("dummyAuth");
  },

  currentUser: () => {
    if (typeof window === "undefined") return null;
    const auth = sessionStorage.getItem("dummyAuth");
    return auth ? JSON.parse(auth) : null;
  },

  // Optional: Clear test users (for testing different scenarios)
  clearTestUsers: () => {
    dummyUsers = [];
  },
};
