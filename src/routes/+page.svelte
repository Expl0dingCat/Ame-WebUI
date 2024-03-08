<script>
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    let state = null;
    let url = "/";

    onMount(() => {
        state = "disconnected";
    });

    async function connect() {
        state = "connected";
    }
</script>

<div
    class="w-screen min-h-screen bg-[url('/background.jpg')] bg-center bg-cover p-8 flex flex-col items-center justify-center text-blue-100"
>
    {#if state === "disconnected"}
        <div class="flex flex-grow flex-col items-center justify-center select-none">
            <main
                class="min-w-[25vw] min-h-[30vh] p-6 rounded-xl backdrop-blur-lg drop-shadow-xl flex flex-col items-center justify-center {!dev
                    ? 'gap-3'
                    : 'gap-1.5'}"
            >
                <div
                    class="flex flex-col lg:leading-loose md:leading-loose leading-tight text-center items-center {!dev
                        ? 'gap-1.5'
                        : ''}"
                >
                    <h1 class="text-3xl font-bold">雨 / Ame{dev ? " (Dev)" : ""}</h1>
                    {#if dev}
                        <p>Please enter the URL of your Ame instance.</p>
                    {:else}
                        <p class="text-wrap w-[75%] leading-tight">
                            Setting a new standard for open-source virtual
                            assistants.
                        </p>
                    {/if}
                </div>
                <div class="flex gap-3">
                    {#if dev}
                        <input
                            bind:value={url}
                            class="bg-blue-100 text-black p-4 h-10 align-middle rounded-full focus:outline-none focus:shadow-lg hover:shadow-lg hover:shadow-blue-200/30 focus:shadow-blue-200/30 transition-shadow ease-in-out duration-200"
                        />
                    {/if}
                    <button
                        on:click={connect}
                        class="bg-blue-200 text-black px-4 h-10 align-middle rounded-full hover:shadow-lg hover:shadow-blue-300/30 transition-shadow ease-in-out duration-200"
                        >Go</button
                    >
                </div>
            </main>
        </div>
    {:else if state === "connected"}
        <main class="flex flex-grow flex-col items-center">
            <div
                class="text-ame flex flex-col justify-center items-center border-2 align-center border-ame py-2 px-4 rounded-full select-none"
            >
                <h1 class="text-xl font-bold">雨 / Ame{dev ? " (Dev)" : ""}</h1>
            </div>
        </main>
    {/if}
</div>
