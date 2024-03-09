<script>
    // deps
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import SvelteMarkdown from "svelte-markdown";

    // state
    let state = null;
    let url = "/";
    let messages = [];

    // add dummy messages
    function addDummyMessages() {
        messages = [
            {
                role: "assistant",
                type: "text",
                content:
                    "I fucking hate you retard fucking kill yourself I hope you die",
            },
            {
                role: "user",
                type: "text",
                content: "why",
            },
            {
                role: "assistant",
                type: "text",
                content: `# Reasons You Should Kill Yourself
## Part 1
### Section 1
**I recommend killing yourself with a gun, but there are *other* methods if you so desire.**
See [this page](https://sanctionedsuicide.org) for more info. \`Thanks.\`
\`\`\`c
#import <stdio.h>

int main(void) {
    printf("Kill yourself!\\n");
    return 0;
}
\`\`\``,
            },
        ];
    }

    // connect to the server
    async function connect() {
        state = "connected";
    }

    // init shit when the website fully loads
    onMount(() => {
        state = "disconnected";
        addDummyMessages();
        connect(); // comment this out later
        hljs.addPlugin(new CopyButtonPlugin());
    });

    $: if (messages.length !== 0) setTimeout(hljs.highlightAll, 20);
</script>

<div
    class="w-screen h-screen bg-ame bg-center bg-cover p-8 flex flex-col items-center justify-center text-blue-100"
>
    {#if state === "disconnected"}
        <div
            class="flex flex-grow flex-col items-center justify-center select-none"
        >
            <main
                class="min-w-[25vw] min-h-[30vh] p-6 rounded-xl flex flex-col items-center justify-center {!dev
                    ? 'gap-3'
                    : 'gap-1.5'} border-2 border-blue-100 shadow-lg shadow-blue-300/30"
            >
                <div
                    class="flex flex-col lg:leading-loose md:leading-loose leading-tight text-center items-center {!dev
                        ? 'gap-1.5'
                        : ''}"
                >
                    <h1 class="text-3xl font-bold">
                        雨 / Ame{dev ? " (Dev)" : ""}
                    </h1>
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
                        class="bg-blue-200 text-black px-4 h-10 align-middle rounded-full hover:shadow-lg hover:shadow-blue-200/30 transition-shadow ease-in-out duration-200"
                        >Go</button
                    >
                </div>
            </main>
        </div>
    {:else if state === "connected"}
        <main
            class="flex flex-grow flex-col items-center min-w-[30vw] max-w-[90vw] gap-8"
        >
            <div
                class="flex flex-col justify-center items-center border-2 align-center border-blue-100 py-2 px-4 rounded-full select-none shadow-lg shadow-blue-300/30"
            >
                <h1 class="text-xl font-bold">雨 / Ame{dev ? " (Dev)" : ""}</h1>
            </div>
            <div class="flex flex-col flex-grow gap-4 overflow-y-scroll">
                {#each messages as message}
                    {#if message.type === "text"}
                        <div
                            class="message pt-2 pb-4 px-4 rounded-xl border-2 border-blue-100 max-w-[80%] hyphens-auto leading-snug {message.role ===
                            'user'
                                ? 'self-start'
                                : 'self-start bg-rain'}"
                        >
                            {#if message.role === "user"}
                                <div class="align-middle py-2 flex gap-1.5">
                                    <img
                                        class="h-6 w-6 rounded-full bg-blue-100 inline"
                                        src="/you_pfp.png"
                                    />
                                    <span class="font-semibold">You</span>
                                </div>
                            {:else}
                                <div class="align-middle py-2 flex gap-1.5">
                                    <img
                                        class="h-6 w-6 rounded-full bg-blue-100 inline"
                                        src="/ame_pfp.jpg"
                                    />
                                    <span class="font-semibold">Ame</span>
                                </div>
                            {/if}
                            <SvelteMarkdown source={message.content} />
                        </div>
                    {:else}{/if}
                {/each}
            </div>
            <div>
                <input />
            </div>
        </main>
    {/if}
</div>
