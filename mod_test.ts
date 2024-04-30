import { assertEquals as equals, assert as ok, assertFalse as no } from "jsr:@std/assert@^0.224.0";
import { PLATFORM, ARCH, IS_64BIT, WINDOWS, LINUX, DARWIN } from "./mod.ts";

Deno.test("platform", () => {

    switch(PLATFORM) {
        case "darwin":
            {
                ok(DARWIN);
                no(LINUX);
                no(WINDOWS);
                ok(IS_64BIT);
            }

            break;

        case "windows":
            {
                no(DARWIN);
                no(LINUX);
                ok(WINDOWS);
                ok(IS_64BIT);
            }
            break;

        case "linux":
            {
                no(DARWIN);
                ok(LINUX);
                no(WINDOWS);
                ok(IS_64BIT);
            }
            break;
        }
});




Deno.test("deno_scenario", async () => {
    const cmd = new Deno.Command('deno', {
        args: ['run', '-A', './scenarios/load_platform.ts'],
        stdout: 'piped',
        stderr: 'piped',
    });

    const output = await cmd.output();
    const decoder = new TextDecoder();
    const text = decoder.decode(output.stdout);
    console.log(decoder.decode(output.stderr));

    equals(text, `${PLATFORM}_${ARCH}\n`);
});

Deno.test("scenario node", async () => {
    const cmd = new Deno.Command('npx', {
        args: ['tsx', './scenarios/load_platform.ts'],
        stdout: 'piped',
        stderr: 'piped',
    });

    const output = await cmd.output();
    const decoder = new TextDecoder();
    const text = decoder.decode(output.stdout);
    console.log(decoder.decode(output.stderr));

    equals(text, `${PLATFORM}_${ARCH}\n`);
})

Deno.test("scenario bun", async () => {
    const cmd = new Deno.Command('bun', {
        args: ['./scenarios/load_platform.ts'],
        stdout: 'piped',
        stderr: 'piped',
    });

    const output = await cmd.output();
    const decoder = new TextDecoder();
    const text = decoder.decode(output.stdout);
    console.log(decoder.decode(output.stderr));

    equals(text, `${PLATFORM}_${ARCH}\n`);
});