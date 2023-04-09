<script>
  import { goto } from "$app/navigation";

  const EmbedApp = () => {
    goto("/auth");
  };
</script>

<h1>SvelteKit and Shopify</h1>

<button on:click={EmbedApp}>Embed App</button>

<style>
  button {
    background: #000;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
