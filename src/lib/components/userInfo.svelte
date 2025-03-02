<script>

    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Button } from "$lib/components/ui/button";
    import { LogOutIcon } from "svelte-feather-icons";
    import { signInWithGoogle, signOut } from "$lib/supabase.js";
    import SignInWidget from "$lib/components/signInWidget.svelte";

    export let user;
</script>



{#if user}
<DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <Button builders={[builder]} variant="ghost" class="hover:bg-transparent">
        <img src={user.user_metadata.avatar_url} alt="profile" class="w-8 h-8 rounded-full">
      </Button>
      
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="pl-3">
      <DropdownMenu.Label class="text-right">{user.user_metadata.name}</DropdownMenu.Label>
      <DropdownMenu.Label class="text-right font-normal font-neutral-500">{user.user_metadata.email}</DropdownMenu.Label>
      <DropdownMenu.Separator></DropdownMenu.Separator>
      <DropdownMenu.Group class="items-end">
        <DropdownMenu.Item class="gap-2 items-end flex w-full justify-end" on:click={async () => {
            await signOut();
            window.location.href = "/";
        }}
        >
            Sign Out
            <LogOutIcon size="18"></LogOutIcon>
        </DropdownMenu.Item>
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
{:else}
    <SignInWidget/>
{/if}