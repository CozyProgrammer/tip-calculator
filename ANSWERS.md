## 1. How to Run

Download the repo, open `index.html` in any browser.
Nothing to install.

Deployed link: [https://cozyprogrammer.github.io/tip-calculator/]

## 2. Stack & Design Choices

I went with vanilla HTML, CSS, and JavaScript. No 
framework. I came into this knowing Java and basic SQL — 
adding React or Vue on top of that would have meant 
pretending to understand something I don't. Vanilla kept 
things honest.

Two decisions I can actually explain:

**The dark navy and gold color scheme** — this wasn't just 
aesthetic. Gold (#e2b96f) on dark navy creates enough 
contrast that the results panel is readable at a glance. 
The whole point of the app is seeing numbers quickly. 
If the results blended into the background that would 
defeat the purpose. The active preset button also turns 
gold so you can tell at a glance which tip rate is selected.

**The max-width: 480px container** — on a wide laptop 
screen a form that stretches edge to edge looks broken. 
I capped the width at 480px so it stays compact and 
centered on big screens, but on a narrow phone it 
fills the width naturally. One rule handles both without 
needing two separate layouts.

## 3. Responsive & Accessibility

On a 360px phone the container fills the screen with 
slightly reduced padding. The three preset tip buttons 
stay side by side — they don't stack. Font sizes drop 
a little so nothing overflows.

On a 1440px laptop the form stays at 480px wide and 
sits in the center. Nothing stretches weird.

One accessibility thing I handled: the error messages 
sit in a span with a fixed minimum height of 16px even 
when empty. Without that, errors popping in and out 
would push the whole layout up and down every time. 
Keeping the height fixed means the layout stays stable.

One thing I didn't handle: ARIA labels. Screen readers 
won't announce the result values meaningfully. I know 
this is a gap — I just didn't have enough time to learn 
and test ARIA properly during a 48-hour window where I 
was also learning HTML for the first time.

## 4. AI Usage

I used Claude (claude.ai) for everything — HTML structure, 
CSS styling, and the JavaScript logic. I'm not going to 
pretend otherwise.

What I actually got out of it: Claude explained each 
section as we went rather than just dumping code. A few 
things stuck.

The error spans being empty by default with a fixed 
min-height — I understood why that decision was made. 
If you let the span collapse to zero height when empty, 
the layout shifts every time an error appears or 
disappears. That's an annoying flicker that makes the 
app feel broken even when it isn't.

The rounding policy is Math.ceil — always round up to 
the nearest paisa. Rs 33.333 becomes Rs 33.34, not 33.33. 
The group never underpays. I chose to keep this after 
Claude explained the alternatives because it's the most 
practical default for splitting a real bill.

One thing I changed: the original explanation had the 
script tag in the head. I moved it to the bottom of body 
after understanding why — HTML loads top to bottom, so 
if JavaScript runs before the inputs exist, it can't 
find them. Putting the script last means everything is 
ready before the code tries to touch it.

## 5. Honest Gap

The validation works but I haven't tried hard enough to 
break it. I caught one thing while testing — entering 0 
people shows an error correctly. But I didn't test things 
like pasting text into the bill field, or entering 
something like 2.5 people, or a bill of 999999999. 
Those edge cases might behave oddly.

With another day I'd go through every input field and 
deliberately try to break it — garbage text, decimals 
where only integers belong, numbers large enough to 
cause display issues. Right now I only tested realistic 
inputs. That's not enough for a real app.
