<script>
  import { onMount } from "svelte";
  import moment from "moment";
  import { Toolbar, MobileView, DesktopView } from './components';
  import { authenticateUser } from './services/auth.js';

  let user = null;
  let chosenDate = moment().format('DDMMYYYY');

  onMount(() => {
    user = JSON.parse(window.localStorage.getItem('user'));
  });

  const login = (stayLoggedIn) => {
    authenticateUser(stayLoggedIn, (authenticatedUser) => {
      user = authenticatedUser;
    });
  }
</script>

<div>
  <Toolbar {user} {login} />
  <div class="desktop-view-container">
    <DesktopView {user} />
  </div>
  <div class="mobile-view-container">
    <MobileView {user} />
  </div>
</div>

<style>
  div {
    height: 100vh;
    box-sizing: border-box;
  }

  div > div {
    height: 94%;
  }

  .desktop-view-container {
      display: block;
    }

    .mobile-view-container {
      display: none;
    }

  @media only screen and (max-width: 1215px) {
    main {
      display: block;
      padding: 0;
    }

    .desktop-view-container {
      display: none;
    }

    .mobile-view-container {
      display: block;
    }
  }
</style>
