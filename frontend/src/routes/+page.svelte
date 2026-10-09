<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { api } from '../lib/api';

  type Cancion = { id: number; titulo: string; artista: string; album: string; genero: string };

  const vacio = { titulo: '', artista: '', album: '', genero: '' };
  let canciones = $state<Cancion[]>([]);
  let form = $state({ ...vacio });
  let editandoId = $state<number | null>(null);

  async function cargar() {
    canciones = await api('/canciones');
  }

  async function guardar(e: SubmitEvent) {
    e.preventDefault();
    if (editandoId) {
      await api(`/canciones/${editandoId}`, { method: 'PUT', body: JSON.stringify(form) });
    } else {
      await api('/canciones', { method: 'POST', body: JSON.stringify(form) });
    }
    cancelar();
    await cargar();
  }

  function editar(c: Cancion) {
    editandoId = c.id;
    form = { titulo: c.titulo, artista: c.artista, album: c.album, genero: c.genero };
  }

  function cancelar() {
    editandoId = null;
    form = { ...vacio };
  }

  async function eliminar(id: number) {
    await api(`/canciones/${id}`, { method: 'DELETE' });
    await cargar();
  }

  function salir() {
    localStorage.removeItem('token');
    goto('/login');
  }

  onMount(() => {
    if (!localStorage.getItem('token')) {
      goto('/login');
      return;
    }
    cargar();
  });
</script>

<h1>PlayOn Vibra - Mis canciones</h1>
<button onclick={salir}>Cerrar sesión</button>

<form onsubmit={guardar}>
  <input bind:value={form.titulo} placeholder="Título" required />
  <input bind:value={form.artista} placeholder="Artista" required />
  <input bind:value={form.album} placeholder="Álbum" />
  <input bind:value={form.genero} placeholder="Género" />
  <button type="submit">{editandoId ? 'Actualizar' : 'Crear'}</button>
  {#if editandoId}<button type="button" onclick={cancelar}>Cancelar</button>{/if}
</form>

<table>
  <thead>
    <tr><th>Título</th><th>Artista</th><th>Álbum</th><th>Género</th><th>Acciones</th></tr>
  </thead>
  <tbody>
    {#each canciones as c (c.id)}
      <tr>
        <td>{c.titulo}</td><td>{c.artista}</td><td>{c.album}</td><td>{c.genero}</td>
        <td>
          <button onclick={() => editar(c)}>Editar</button>
          <button onclick={() => eliminar(c.id)}>Eliminar</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>