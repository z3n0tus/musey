<script>
  export let login;

  let stayLoggedIn = false;
  let modalOpen = false;
</script>

<section>
  <span on:click={() => modalOpen = true}>Login with Google</span>
</section>

{#if modalOpen}
<modal>
  <div>
    <p>
      By continuing to login and use this site, you agree that your notes will be stored
      in a database to which the administrator will have access. These notes are not secure. Do not include private information.
    </p>
    <p>
      If you opt to stay logged in, you agree to your Google account details being stored in your browser's local storage in order to keep you logged in. The administrator doesn't have access to your passwords, but can see your e-mail address and when you logged in.
    </p>
    <p>If you agree to this, click 'Login Anyway'. Otherwise, click 'Cancel'.</p>
    <button on:click={() => login(stayLoggedIn)}>Login Anyway</button>
    <button on:click={() => modalOpen = false}>Cancel</button>
    <label>
      Stay logged in? &nbsp;
      <input type="checkbox" bind:checked={stayLoggedIn} />
    </label>
  </div>
</modal>
{/if}

<style>
  section {
    position: absolute;
    right: 30px;
    top: 20px;
  }

  section > span:hover {
    cursor: pointer;
    color: #777777;
  }

  modal {
    position: absolute;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 100000;
  }

  modal > div {
    padding: 32px;
    background-color: white;
    margin: 15%;
  }

  modal > div > label {
    display: inline-block;
    margin-left: 16px;
  }

  button {
    text-align: center;
    width: 200px;
    padding: 8px 16px;
    background-color: white;
    color: black;
  }
  
  button:hover {
    cursor: pointer;
    background-color: #eeeeee;
  }
</style>