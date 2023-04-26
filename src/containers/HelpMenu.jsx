import React from "react";
import ButtonPrimary from "../components/ButtonPrimary";
import { BiEdit } from "react-icons/bi";

const HelpMenu = ({ isShowing }) => {
  return (
    <div
      className={
        "absolute left-0 z-10 h-[700px] w-[700px] items-center justify-center rounded-3xl bg-stone-200 p-5 drop-shadow-xl transition-transform duration-500 ease-in-out " +
        (!isShowing && "-translate-x-[100%]")
      }
    >
      <div className="flex h-full flex-col overflow-y-auto rounded-lg bg-stone-100 p-5">
        <h1 className="font-inter text-3xl font-semibold drop-shadow-md">
          Welcome to WordPlay
        </h1>
        <p className="mb-5 mt-5 text-base">
          This help menu will get you started with the application. It will take
          you through the process behind-the-scene, detail how it parses your
          input and how you in turn can modify it.
        </p>
        <h2 className="text-2xl font-semibold">Words to notes, what!?</h2>
        <p className="mb-5 mt-5 text-base">
          That's right, this application will turn your words into notes. The
          process isn't overly complicated. If you open the sidebar by pressing
          this button on the far right of the toolbar:
        </p>
        <div></div>
        <ButtonPrimary
          edit="w-40 translate-x-[240px] flex justify-center items-center text-center"
          text="Edit Rules"
          icon={<BiEdit className="mr-2" size="30px" />}
        />
        <p className="mb-5 mt-5 text-base">
          You will see three dropdown menus and one "surprise" button you can
          press. These will generate the notes through which the words are
          converted. Under the "Mapping" section, you can see how each letter of
          the alphabet maps to a note. These notes are based on the selections
          of the three dropdowns above. If you select a root note, a scale, and
          an octave, the mapping will be filled out for you. If you don't know
          what to pick, simply press the "Surprise me" button.
        </p>
        <h3 className="text-xl font-semibold">
          How does it know what note to use?
        </h3>
        <p className="mb-5 mt-5 text-base">
          ...but a word is composed of multiple letters, how does it know which
          note to pick? This process is simple, the application calculates the
          indices of each letter in a word in relation to the alphabet, or the
          "Mapping" as you can see in the sidebar. It then averages these
          indices and picks a note using the average. This means if you write
          "abc", it will pick the note corresponding to "b". This can be hard to
          figure out intuitively... Luckily, the application displays the note
          it has calculated just under each word in a track.
        </p>
        <h3 className="text-xl font-semibold">What about the rhythm?</h3>
        <p className="mb-5 mt-5 text-base">
          The calculation for rhythm is also very straightforward. Each word
          corresponds to a quarter note.
        </p>
        <h3 className="text-xl font-semibold">What about the instrument?</h3>
        <p className="mb-5 mt-5 text-base">
          The instrument isn't inferred from the words themselves. You can
          select the instrument using the dropdown on a track. Personal
          favourites include "Pluck", "Mono", "Synth" and "AM". Try them all out
          and see which one you like!
        </p>
        <h2 className="text-2xl font-semibold">
          Exciting, but what more can you do?
        </h2>
        <p className="mb-5 mt-5 text-base">
          It doesn't end there. WordPlay offers more customisability of the note
          output.
        </p>
        <h3 className="text-xl font-semibold">Changing duration of a note</h3>
        <p className="mb-5 mt-5 text-base">
          You can change the duration by using more letters. Below is a list of
          the word length and the resulting duration of the note:
        </p>
        <ul className="ml-10 list-disc">
          <li>
            <strong>More than 20 letters:</strong> 1
          </li>
          <li>
            <strong>More than 10 letters:</strong> 1/2
          </li>
          <li>
            <strong>More than 5 letters:</strong> 1/4
          </li>
          <li>
            <strong>More than 3 letters:</strong> 1/8
          </li>
          <li>
            <strong>One letter:</strong> 1/16
          </li>
        </ul>
        <p className="mb-5 mt-5 text-base">
          A whole note means it spans the duration of an entire bar.
        </p>
        <h3 className="text-xl font-semibold">Changing velocity of a note</h3>
        <p className="mb-5 mt-5 text-base">
          You can change the velocity of a note by using more uppercase letters,
          or by using an exclamation mark. In the case of capital letters, the
          more you use the higher the velocity, so if you want a word to really
          hit hard, SCREAM at the application!
        </p>
        <h3 className="text-xl font-semibold">Changing the timing of a note</h3>
        <p className="mb-5 mt-5 text-base">
          Each word is by default spaced a quarter note apart. If you want to
          change this, simply insert separators! Below is a list of the valid
          separators and the corresponding pause it adds:
        </p>
        <ul className="ml-10 list-disc">
          <li>
            <strong>Comma:</strong> 1/16
          </li>
          <li>
            <strong>Semicolon:</strong> 1/8
          </li>
          <li>
            <strong>Colon:</strong> 1/8 triplet
          </li>
          <li>
            <strong>Punctuation:</strong> 1/2
          </li>
          <li>
            <strong>Triple dots:</strong> 1
          </li>
          <li>
            <strong>Exclamation:</strong> 1/4 triplet
          </li>
        </ul>
        <p className="mb-5 mt-5 text-base">
          These are all the things you can do to individual notes. However, you
          can also modify the track as a whole too!
        </p>
        <h2 className="text-2xl font-semibold">
          What can I do to an entire track?
        </h2>
        <p className="mb-5 mt-5 text-base">
          On the right side of each track, you'll find "Octave", "Speed" and
          "Root".
        </p>
        <h3 className="text-xl font-semibold">Changing the octave</h3>
        <p className="mb-5 mt-5 text-base">
          You can change the octave of a track by using the octave dropdown
          menu. This change will be reflected in <em>all</em> the notes. For
          example, if you want one track to act as a baseline, you can change
          the octave to a lower one, e.g. 1 or 2.
        </p>
        <h3 className="text-xl font-semibold">Changing the Speed</h3>
        <p className="mb-5 mt-5 text-base">
          If you're finding that a track is playing the notes too slowly, fret
          not! You can change the speed of a track by using the speed dropdown
          menu. This might work different to how you initially think. A speed of
          e.g. "0.5" will speed up the track by twice the amount, because it is
          halfing the timings of each note. A speed of e.g. "2" will double the
          duration of a track, meaning it will play back twice as slow.
        </p>
        <h3 className="text-xl font-semibold">Changing the Root</h3>
        <p className="mb-5 mt-5 text-base">
          If you like the way a particular sequence of word sounds, but wish to
          change the notes while maintaining their intervals to one another, you
          can simply use the "Root" dropdown menu. If, for example, the root
          note is "C" and the scale is major, the notes of the scale will be "C
          D E F G A B". If you then select "E" on an individual track, all the
          notes of that track will be "shifted" by two steps, as "E" is two
          steps away from "C" in the C Major scale.
        </p>
        <h2 className="text-2xl font-semibold">That's it for WordPlay!</h2>
        <p className="mb-5 mt-5 text-base">
          Thank you for trying my application out, I hope you have fun playing
          with words!
        </p>
      </div>
    </div>
  );
};

export default HelpMenu;
