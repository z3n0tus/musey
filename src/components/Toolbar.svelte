<script>
  import Login from './Login.svelte';

  export let user;
  export let login;
</script>

<style>
  main {
    padding: 16px 32px;
    text-align: right;
    border-bottom: 1px solid whitesmoke;
    display: flex;
    width: 100vw;
    box-sizing: border-box;
    background-color: white;
    height: 6%;
  }

  p {
    padding: 0;
    margin: 0;
  }

  main > login {
    flex: 1;
    text-align: right;
  }

  h1 {
    margin: 0;
    margin-right: 16px;
    font-size: 16px;
  }

  main > user-block {
    flex: 1;
  }

  main > user-block > p > green {
    color: green;
  }
</style>

<main>
  {#if !user}
    <login>
      <Login login={login} />
    </login>
    {:else}
      <h1>Musey</h1>
      <user-block>
        <p>Hi, <green>{user.displayName}!</green></p>
      </user-block>
  {/if}
</main>