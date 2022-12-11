import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import ToggleTheme from "./components/ToggleTheme";
import { LocaleProvider } from "./context/LocaleContext";
import AddPages from "./pages/AddPages";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { getUserLogged, putAccessToken } from "./utils/api";
import { ThemeProvider } from "./context/ThemeContext";
import DetailPageNote from "./pages/DetailPage";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      localeContext: {
        locale: localStorage.getItem("locale") || "id",
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale =
              prevState.localeContext.locale === "id" ? "en" : "id";
            localStorage.setItem("locale", newLocale);

            return {
              ...prevState.localeContext,
              locale: newLocale,
            };
          });
        },
      },
      theme: localStorage.getItem("theme") || "dark",
      toggleTheme: () => {
        this.setState((prevState) => {
          // mendapatkan nilai tema baru berdasarkan state sebelumnya
          const newTheme = prevState.theme === "dark" ? "light" : "dark";
          // menyimpan nilai tema baru ke local storage
          localStorage.setItem("theme", newTheme);

          return {
            theme: newTheme,
          };
        });
      },
    };
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    document.documentElement.setAttribute("data-theme", this.state.theme);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute("data-theme", this.state.theme);
    }
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });
    putAccessToken("");
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
          <ThemeProvider value={this.state}>
            <div className="app-container">
              <header>
                <h1>
                  <Link to="/">
                    Aplikasi Catatan
                  </Link>
                </h1>
              </header>

              <body>
                <Routes>
                  <Route
                    path="/*"
                    element={<LoginPage loginSuccess={this.onLoginSuccess} />}
                  />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </body>
            </div>
          </ThemeProvider>
      );
    }

    return (
        <ThemeProvider value={this.state}>
          <LocaleProvider value={this.state.localeContext}>
          <div className="app-container">
            <header>
              <h1>
                <Link to="/">
                  {this.state.localeContext.locale === "id"
                    ? "Aplikasi Catatan"
                    : "Notes App"}
                </Link>
              </h1>
              <ToggleTheme />
              <Navigation
                logout={this.onLogout}
                name={this.state.authedUser.name}
              />
            </header>

            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/add" element={<AddPages />} />
                <Route path="/Notes/:id" element={<DetailPageNote />} />
              </Routes>
            </main>
          </div>
          </LocaleProvider>
        </ThemeProvider>
    );
  }
}

export default App;
