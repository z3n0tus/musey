<script>
  import { onMount } from "svelte";
  import moment from "moment";
  import { auth, googleProvider, db, setPersistence } from './firebase.setup.js';
  import Login from './Login.svelte';
  import { saveItemToDb, getItemsFromDb, deleteItemFromDb } from './db.js';
  import { authenticateUser } from './auth.js';
  import { extractTagsFromText } from './utils.js';
  import InputSection from './InputSection.svelte';
  import DisplaySection from './DisplaySection.svelte';
  
  let items = [];
  let user = null;
  let chosenDate = moment().format('DDMMYYYY');

  const getItems = () => {
    getItemsFromDb(user.uid, chosenDate, (doc) => {
       items = doc.docs.map(item => (
         {
           ...item.data(),
           dbId: item.id,
        }));
    });
  };

  $: {
    if (chosenDate.length === 8 && moment(chosenDate, 'DDMMYYYY')._isValid && user) {
      getItems();
    }
  }

  onMount(() => {
    user = JSON.parse(window.localStorage.getItem('user'));
    if (user) {
      getItems();
    }
  });

  const login = (stayLoggedIn) => {
    authenticateUser(stayLoggedIn, (authenticatedUser) => {
      user = authenticatedUser;
    });
  }

  const saveInput = input => {
    const { text, tags } = extractTagsFromText(input);
    saveItemToDb(user, text, chosenDate, tags);
  };
</script>

<main>
  <section>
    <InputSection {saveInput} />
  </section>
  <section>
    <div>
      {#if !user}
        <Login login={login} />
        {:else}
        <datepicker>
          <input type="text" bind:value={chosenDate} />
        </datepicker>
        <user>Hi, <green>{user.displayName}!</green></user>
      {/if}
    </div>
    <DisplaySection {items} {user} {deleteItemFromDb} {chosenDate} />
  </section>
</main>


<style>
  main {
    display: flex;
  }

  main > section {
    height: 100vh;
    overflow: hidden;
    flex: 1;
  }

  main > section:nth-child(1) {
    min-width: 55%;
  }

  main > section > div {
    background-color: white;
    padding: 16px 32px;
    text-align: right;
  }

  main > section > div > user > green {
    color: green;
  }

  datepicker {
    position: absolute;
    bottom: 16px;
    right: 16px;
  }
</style>
