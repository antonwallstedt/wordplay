# WordPlay: Turning our Everyday Language into Programmable Music

Welcome to the WordPlay git repository. You can find the app at https://wordplay-music.vercel.app

WordPlay sequences notes using natural language. You simply type in whatever text you want, for example a snippet from your favourite book or some text you see around you, and the words will be converted to notes. The mapping from letters to notes is very simple, each letter in the English alphabet corresponds to a note from a given scale. You can defined the scale, the octave range and the root note as you want, and the app will automatically generate the mapping for you. This makes it quick and easy to explore differnet musical scales and to get some sound going. The mapping is exposed, and I'm planning on adding a feature that lets you edit the mapping with simple programming rules and arithmetic. For example, you can make use of the '++' operator in combination with e.g. modulus, to get a more dynamic sequence.

This _pseudo_ live coding language is not Turing complete, so users remain limited in the programmability. It aims to introduce novice users to the world of live coding, with small steps towards common programming patterns used. No knowledge of music theory is required (however won't harm you, of course).
