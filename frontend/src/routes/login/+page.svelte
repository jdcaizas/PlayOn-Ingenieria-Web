<script lang="ts">
  import { goto } from '$app/navigation';
import { API } from '../../lib/api';

  let usuario = $state('');
  let password = $state('');
  let error = $state('');

  async function entrar(e: SubmitEvent) {
    e.preventDefault();
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, password })
    });
    if (!res.ok) {
      error = 'Usuario o contraseña incorrectos';
      return;
    }
    const data = await res.json();
    localStorage.setItem('token', data.token);
    goto('/');
  }
</script>

<h1>PlayOn Vibra - Iniciar sesión</h1>

<form onsubmit={entrar}>
  <input bind:value={usuario} placeholder="Usuario" />
  <input bind:value={password} type="password" placeholder="Contraseña" />
  <button type="submit">Entrar</button>
</form>

{#if error}<p style="color:red">{error}</p>{/if}