<script>
    // deps
    import { onMount } from "svelte";
    import { marked } from "marked";
    import { dev } from "$app/environment";
    import SvelteMarkdown from "svelte-markdown";
    import katex from "$lib/katex.svelte";

    // state
    let state = null;
    let url = "/";
    let messages = [];
    let textarea;
    let container;
    let sendingMessage = false;

    // send message
    async function sendMessage() {
        // disable the textarea
        textarea.disabled = true;
        // set the message
        let message = textarea.value;
        // clear the textarea
        textarea.value = "";
        // determine if we've scrolled to the bottom
        let scrolled = container.scrollTop === container.scrollTopMax;
        // set sending message to true
        sendingMessage = true;
        // change the messages array
        messages = [
            ...messages,
            {
                role: "user",
                type: "text",
                content: message,
            },
        ];
        // if we were scrolled to the bottom
        if (scrolled)
            setTimeout(
                () => (container.scrollTop = container.scrollTopMax),
                40,
            );
        // request a response
        let response = await fetch(`${url}api/v1/text`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ input: message }),
        }).then((res) => res.json());
        // check scrolling again
        scrolled = container.scrollTop === container.scrollTopMax;
        // turn off sending message
        sendingMessage = false;
        // reenable the textarea
        textarea.disabled = false;
        // add the message
        messages = [
            ...messages,
            {
                role: "assistant",
                type: "text",
                content: response.output,
            },
        ];
        // if we were scrolled to the bottom
        if (scrolled)
            setTimeout(
                () => (container.scrollTop = container.scrollTopMax),
                40,
            );
    }

    // add dummy messages
    function addDummyMessages() {
        messages = [
            {
                role: "assistant",
                type: "text",
                content: "mrrp mrrp meoooow :3 nya!! nya meow :3",
            },
            {
                role: "user",
                type: "text",
                content: "what",
            },
            {
                role: "assistant",
                type: "text",
                content: `# This is a header

This is a paragraph.

* This is a list
* With two items
    1. And a sublist
    2. That is ordered
        * With another
        * Sublist inside

Sure, here's a simple table with random data:

| ID | Name    | Age | Occupation  |
|----|---------|-----|-------------|
| 1  | Alice   | 28  | Engineer    |
| 2  | Bob     | 35  | Teacher     |
| 3  | Charlie | 42  | Doctor      |
| 4  | David   | 30  | Artist      |
| 5  | Emma    | 25  | Programmer  |

This is a basic table with columns for ID, Name, Age, and Occupation, and some randomly assigned data in each row.

~~Woof!~~ Meow!

$\\int_{0}^{1} e^{-x^2} \\, dx = \\frac{\\sqrt{\\pi}}{2}$

This equation represents the definite integral of the function $e^{-x^2}$ from $0$ to $1$, which equals $\\frac{\\sqrt{\\pi}}{2}$. It's a special case of the Gaussian integral, which has significance in probability theory, statistics, and various branches of physics.

> This is a block quote.
> 
> Woof!

Isn't that crazy?

\`\`\`c
#import <stdio.h>

int main(void) {
    printf("nya!\\n");
    return 0;
}
\`\`\``,
            },
            {
                role: "user",
                type: "text",
                content: "would you rather use grok or chatgpt",
            },
            {
                role: "assistant",
                type: "text",
                content: "chatgpt, duh",
            },
        ];
    }

    // connect to the server
    async function connect() {
        state = "connected";
        // addDummyMessages();
    }

    // init shit when the website fully loads
    onMount(() => {
        state = "disconnected";
        marked.use(markedKatex());
        hljs.addPlugin(new CopyButtonPlugin());
        // connect(); // comment this out later
    });

    $: if (messages.length !== 0) setTimeout(hljs.highlightAll, 20);
</script>

<div
    class="w-screen h-screen bg-ame bg-center bg-cover flex flex-col items-center justify-center text-blue-100"
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
                            class="bg-blue-100 text-ame p-4 h-10 align-middle rounded-full focus:outline-none focus:shadow-lg hover:shadow-lg hover:shadow-blue-200/30 focus:shadow-blue-200/30 transition-shadow ease-in-out duration-200"
                        />
                    {/if}
                    <button
                        on:click={connect}
                        class="bg-blue-200 text-ame px-4 h-10 align-middle rounded-full hover:shadow-lg hover:shadow-blue-200/30 transition-shadow ease-in-out duration-200"
                        >Go</button
                    >
                </div>
            </main>
        </div>
    {:else if state === "connected"}
        <div
            class="absolute z-50 flex flex-col top-8 justify-center items-center backdrop-blur-md border-2 align-center border-blue-100 py-2 px-4 rounded-full select-none shadow-lg shadow-blue-300/30"
        >
            <h1 class="text-xl font-bold">雨 / Ame{dev ? " (Dev)" : ""}</h1>
        </div>
        <main
            class="flex flex-grow flex-col items-center lg:w-[50vw] md:w-[70vw] w-[90vw] h-full"
        >
            <div
                bind:this={container}
                class="flex flex-col flex-grow gap-4 overflow-y-scroll w-full"
            >
                <div class="h-1 w-48 shrink-0" />
                {#if messages.length === 0 && !sendingMessage}
                    <h1 class="text-center text-xl pt-20 hyphens-auto">
                        There are no messages yet. Use the textbox to start
                        chatting with Ame!
                    </h1>
                    <p class="hyphens-auto">
                        As a LLaMA-powered chatbot, Ame is highly capable,
                        performing nearly as well as its closed-source
                        competitors.
                    </p>
                    <p class="hyphens-auto">
                        Ame is capable of all of the following:
                    </p>
                    <ul class="mt-[-0.75rem] list-disc list-inside">
                        <li>Processing large amounts of text</li>
                        <li>Generating code</li>
                        <li>Speaking to you</li>
                        <li>Creating tables</li>
                        <li>Formatting messages in Markdown and LaTeX</li>
                        <li>And more!</li>
                    </ul>
                    <p class="hyphens-auto">
                        Please note that the Ame developers are not responsible
                        for any inaccurate or harmful generations. As our LLaMA
                        model is uncensored, users are in control of how safe
                        they want their generations to be.
                    </p>
                {:else}
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
                                <SvelteMarkdown
                                    source={message.content}
                                    options={marked.defaults}
                                    renderers={{
                                        blockKatex: katex,
                                        inlineKatex: katex,
                                    }}
                                />
                            </div>
                        {:else}{/if}
                    {/each}
                {/if}
                {#if sendingMessage}
                    <div class="align-middle">
                        <img
                            class="h-16 w-16 rounded-full inline"
                            src="/spinner.apng"
                        />
                        <span class="text-lg select-none"
                            >Generating response...</span
                        >
                    </div>
                {/if}
                <div class="h-24 w-48 shrink-0" />
            </div>
        </main>
        <div
            class="absolute bottom-8 lg:w-[48vw] md:w-[68vw] w-[88vw] flex gap-2"
        >
            <textarea
                rows="1"
                style="height: auto"
                placeholder="Input a message..."
                class="flex-grow backdrop-blur-md bg-transparent border-2 border-blue-100 p-4 align-middle rounded-3xl focus:outline-none focus:shadow-lg hover:shadow-lg hover:shadow-blue-200/30 focus:shadow-blue-200/30 transition-shadow ease-in-out duration-200"
                bind:this={textarea}
                on:input={() => {
                    textarea.style.height = "auto";
                    textarea.style.height = `${textarea.scrollHeight + 4}px`;
                }}
                on:keydown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                    }
                }}
            />
        </div>
    {/if}
</div>
