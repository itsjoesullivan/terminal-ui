#terminal-ui

Writing to the terminal is like writing to a typewriter. You can't move characters, you can only move the paper. Hence our typical CLI interface.

If you want to create the appearance of moving the characters, you can clear the screen every frame and redraw it.

However, that's actually not very fast! So a little optimization helps.

terminal-ui (tui) provides that optimization by rendering character segments across the screen.

The idea is that you've got a model somewhere (say, a text document) which is reporting diffs to tui like:

Say you've already printed to your terminal:

```

This terminal stuff is hard


```

```javascript
diff = {
		line: 2,
		from: 25,
		to: 29,
		content: 'easy'
	};
```

Well, just do:

```javascript
tui.draw(diff);
```

And you end up with:

```

This terminal stuff is heasy

```

'Nuff said!
