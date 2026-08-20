// ============================================================
// compass.js — the interactive Compass of Agape
// Loaded only by /writings/on-the-compass-of-agape/, together with
// compass.css. Selecting a term on the plate — or a bolded term in the
// companion document — opens its definition in a drawer.
//
// DEFS and KICKER below are the text of the figure. To revise a
// definition, edit it here: nothing else reads from these.
// ============================================================

(function () {
  "use strict";

  // --- The definitions ------------------------------------------------------

  const DEFS = {
    "agape": {
      "title": "Agape",
      "paras": [
        "The image the light forms in passing through the crystal of the self; one’s sense of self extended into what lies beyond it. Of itself it extends without limit and toward no end, and it has no virtue of its own; it will overrun any single virtue taken alone. It is brought to temperance — to a holdable shape — only by all four virtues at once, and in being shaped it becomes the picture by which the self meets the world. It is therefore not something one has but the form one becomes when being shines through one: love given shape by the four faces it must pass through, and by nothing less. It is fixed at the centre; everything else turns around it."
      ]
    },
    "nuance": {
      "title": "Nuance",
      "paras": [
        "The disposition of sensitivity to the particular — the faculty that refuses to collapse the specific into the general, the person into the type, the moment into the category. A hub-virtue, held immediately against Agape on the western face toward Mythos: love does not journey to nuance, it loves nuancedly or it does not love at all. As a face of the crystal, it is where the light bends toward meaning. It is register-neutral, a grip love is held with in both the conscious and the subconscious. Held, it lets love see what is actually before it.",
        "Opens onto.  Acceptance, its outer condition on the western flank — deep face Pistis."
      ]
    },
    "prudence": {
      "title": "Prudence",
      "paras": [
        "The disposition of practical wisdom — the faculty that fits means to ends, counts cost, and gives love a measure in action. The eastern hub-virtue, held immediately against Agape on the face toward Logos; like Nuance it is an immediate grip rather than a destination, and one does not approach it through stations. As a face of the crystal, it is where the light bends toward order. Register-neutral, the second hand love grasps with. Held, it lets love act without ruin.",
        "Opens onto.  Attunement, its outer condition on the eastern flank — deep face Gnosis."
      ]
    },
    "logic": {
      "title": "Logic",
      "paras": [
        "The terminal discipline of the conscious mind — the testing faculty that demands coherence and submits love’s seeing to evidence and doubt before it reaches the world. Unlike the hub-virtues, Logic is a gate, not a grip: it sits at the rim, the last station of the conscious ascent, abutting Cosmos. It is register-bound — it belongs wholly to the conscious hemisphere and is its pole. As a face of the crystal, it is the upper contact where light meets glass and throws the glint that is Cosmos. Reached, it keeps love from believing everything it loves.",
        "Perfected.  Logic brought to fullness through the other three virtues becomes Amplitude — sight of the true nature of the real and the direction of time. Its depth runs not outward onto a flank but upward along the spine."
      ]
    },
    "humility": {
      "title": "Humility",
      "paras": [
        "The terminal discipline of the surrendered self — the faculty that empties love’s grip, consents to be small, and lets love enter conduct without seizing it. The lower gate, the rim-virtue at the foot of the subconscious descent, abutting Ethos, and the pole of the subconscious hemisphere, register-bound to it absolutely. As a face of the crystal, it is the contact where light throws the glint that is Ethos. Reached, it keeps love from remaking what it loves.",
        "Perfected.  Humility brought to fullness through the other three virtues becomes Chaos — the childlike freedom on the far side of complete surrender. Its depth runs downward along the spine."
      ]
    },
    "acceptance": {
      "title": "Acceptance",
      "paras": [
        "The outer condition on the western flank, the unbounded ground that Nuance opens onto — what is given back to love when it meets the world with sensitivity to the particular. Not an act but a state that obtains: the standing-open to what is, as it is, before it is sorted or refused. Where Nuance is the grip love is held with, Acceptance is the atmosphere that grip reaches into; one is enacted from within the crystal, the other received from beyond it. Held in its plain form, it is the receptivity that lets meaning return.",
        "Deep face — Pistis.  Faith not as belief but as the trust that the particular, fully received, is trustworthy: the transcendent perfection of Nuance, the acceptance that has become fidelity. It is the far shore of the western flank — a name for what returns."
      ]
    },
    "attunement": {
      "title": "Attunement",
      "paras": [
        "The outer condition on the eastern flank, the unbounded ground that Prudence opens onto — what is given back to love when it meets the world with practical wisdom. Like Acceptance it is received, not done: the fitting of self to the order of things, the resonance between one’s measure and the measure of what is. Where Prudence is the hand love grasps with, Attunement is the order that hand comes into accord with. Held plainly, it is the responsiveness that lets right action return.",
        "Deep face — Gnosis.  Not secret knowledge but the knowing that comes of being rightly tuned: the transcendent perfection of Prudence, the attunement that has become understanding. It is the far shore of the eastern flank."
      ]
    },
    "cosmos": {
      "title": "Cosmos",
      "paras": [
        "The real world as it is, as we are discovering it — the world we cannot hold whole, whose gaps the mind fills by abstraction to form a totality that satisfies its inner logic. On the figure, the glint thrown when love’s light bends through Logic: the world appearing as ordered totality, all-that-is grasped as coherent. Polar, at the conscious pole, and cast outside the circle of the knowable — the true cosmos always exceeds the self that would contain it; one only ever approximates it. The human bridge toward it is science and cosmology. First term of the cascade: that from which all else descends and which limits all the rest."
      ]
    },
    "logos": {
      "title": "Logos",
      "paras": [
        "The functional operation of the cosmos, the order and generation of all things; the order of the universe as it bears on the human condition — the meta-ethical factors that incentivise behaviour. A person’s logos grows more attuned to the cosmos as their cosmology clears. On the figure, the glint through Prudence: the world appearing as navigable order, reason, word, and law, grasped by practical wisdom. Equatorial, on the eastern rim; its outer condition is Attunement (deep face Gnosis) — a word the formal definition itself reaches for. Second term of the cascade: the cosmos’s operation, which limits the symbols available to the mythos."
      ]
    },
    "mythos": {
      "title": "Mythos",
      "paras": [
        "What we imagine reality to be in lieu of absolute truth — the collective symbols, associations, and archetypes a culture builds, the shared and blended paradigm we communicate. Since all human knowledge is approximate, all human paradigms are technically mythos: it is the medium we actually live in, not how the world truly is. On the figure, the glint through Nuance: the world appearing as meaning and story, the particular bearing weight, grasped by the sensitivity that refuses to let the blend collapse into a single myth. Equatorial, on the western rim — the ambient medium, porous, always being separated from the truer terms by the mental arts. Third term of the cascade: the imagined order through which conduct forms. Its disorder is the veil mistaken for the world (see Lineage)."
      ]
    },
    "ethos": {
      "title": "Ethos",
      "paras": [
        "The structure of human behaviour that forms within us through the mythos — the inner Logos, a self-orienting system that builds its own structure through observation, conditioning, and rationality: the scaffolding of the persona. On the figure, the glint through Humility: the world appearing as character and conduct, the lived field of acting-with-others, reached by the emptying that lets love enter conduct without seizing it. Polar, at the subconscious pole, cast outside the circle — it forms below deliberate knowing. Final term of the cascade: the inner order into which the whole descent settles. That it is the inner Logos binds the southern pole to the eastern equator — the world’s order, passed through the veil of imagination, becomes the order within a person."
      ]
    },
    "amplitude": {
      "title": "Amplitude",
      "paras": [
        "A station high on the upper spine, deep in the cosmic cap — the perfected form of Logic, reached only by passing through the discipline, its threshold of Temperance, and the glint of Cosmos. It is reason brought to fullness through the other three virtues: no longer mere testing but sight — the capacity to know the true nature of the real and the direction of time, which itself follows the rise and fall of an amplitude. Its lineage runs back through the navigation of probability; its plain face is the height of clear sight.",
        "As image.  Read outward from Agape: how far up love’s reasoning can open before completion — the perfection of a virtue.",
        "As light.  Read upward from the Void: the late stage where the nearly-complete projection takes on its readable waveform, the beam resolving into the shape that will land as the Kingdom."
      ]
    },
    "chaos": {
      "title": "Chaos",
      "paras": [
        "A station deep on the lower spine, within the polar floor — the perfected form of Humility, reached only by passing through the discipline, its threshold of Kenosis, and the glint of Ethos. It is emptying brought to fullness through the other three virtues: no longer self-diminishment but liberty — the childlike freedom of a self that, having released every grip, can move any direction; the generative unruliness of the Monkey King. It is not disorder against the world but the open spontaneity on the far side of complete surrender.",
        "As image.  Read outward from Agape: how far down love’s emptying can open before it reaches the source — the perfection of a virtue.",
        "As light.  Read upward from the Void: the stage just above Being where the rising radiance first stirs into generative variety, the source’s first differentiation before it is disciplined into order higher up."
      ]
    },
    "way": {
      "title": "Way",
      "paras": [
        "The innermost station, nearest Agape — the path love first sets out on, the initial orientation of the seeking mind before it is questioned or tested. Love’s first step upward into reasoning."
      ]
    },
    "doubt": {
      "title": "Doubt",
      "paras": [
        "The questioning the way provokes — not the enemy of reason but its living interior, the honest uncertainty without which reason hardens. The sublime logic hidden in doubt: a Logic that has expelled its doubt has become mere certitude."
      ]
    },
    "evidence": {
      "title": "Evidence",
      "paras": [
        "The station nearest the gate of Logic — the testing that doubt demands, the weighing of what is so, the culminating discipline before Logic seals the upper arm."
      ]
    },
    "grace": {
      "title": "Grace",
      "paras": [
        "The innermost station, nearest Agape — the first unearned gift, love extended before it is deserved or asked: the spontaneous overflow of bounded love downward."
      ]
    },
    "compassion": {
      "title": "Compassion",
      "paras": [
        "The feeling-with that grace opens into — love entering the condition of the other, suffering alongside rather than above."
      ]
    },
    "forgiveness": {
      "title": "Forgiveness",
      "paras": [
        "The station nearest the gate of Humility — the release of debt, the letting-go that culminates the descent and opens into the self-emptying of Humility."
      ]
    },
    "temperance": {
      "title": "Temperance",
      "paras": [
        "The upper threshold-act, the rim seen from the conscious side — the disciplined edge that knows where knowing must stop. It bears the name of the state the whole cross produces: love brought to proportion by all four virtues at once. The crown of the figure is named for what the figure is for. With Kenosis it forms the joint seal — held together, the ascent and descent are consummated and the Heavens meet the Earth."
      ]
    },
    "adaptation": {
      "title": "Adaptation",
      "paras": [
        "The motion between the threshold and the perfected pole — the supple refitting by which a tempered mind keeps adjusting to what is, rather than freezing at its own limit."
      ]
    },
    "multiplicity": {
      "title": "Multiplicity",
      "paras": [
        "The motion between the perfected pole and completion — the distribution of a unity into many, so that no single part can dominate the whole. The structure by which a completed thing keeps from tyrannising itself; the anti-domination form just below the apex."
      ]
    },
    "kingdom": {
      "title": "The Kingdom",
      "paras": [
        "The upper terminus — completion, the image landed whole, set above the gate of Logic, far from yet near to the source. As light, the screen the beam finally strikes; as image, fullness, the picture entire. A true edge of the figure: not a wall but the limit past which one leaves it."
      ]
    },
    "kenosis": {
      "title": "Kenosis",
      "paras": [
        "The lower threshold-act, the rim seen from beneath — the emptying that releases the grip on the knowable and lets it open into ground. Where Temperance holds the limit, Kenosis releases it; the two are one membrane seen from its conscious and its subconscious sides. With Temperance, the joint seal of the spine."
      ]
    },
    "evolution": {
      "title": "Evolution",
      "paras": [
        "The motion between the threshold and the perfected pole — the generative unfolding by which an emptied self develops rather than merely collapses. Mirror of Adaptation."
      ]
    },
    "being": {
      "title": "Being",
      "paras": [
        "The motion between the perfected pole and the ground — bare existence, the “is” still shadowed by its own negation, to be yet not be: the last station before the source. Mirror of Multiplicity."
      ]
    },
    "void": {
      "title": "The Void",
      "paras": [
        "The lower terminus — not darkness but unmanifest radiance, the nameless ground over which all is suspended and through which all emanates: oblivion as source. As light, the lamp behind all things; as image, the abyss-ground. The other true edge of the figure."
      ]
    },
    "abstraction": {
      "title": "Abstraction",
      "paras": [
        "The mind’s predictive modelling — understanding as the satisfaction of binding abstractions whose predictive value lets us interpret reality; the hole-filling by which a coherent Cosmos is formed. The highest western term, where meaning first reaches toward totality. Answers Relativity across the equator."
      ]
    },
    "wonder": {
      "title": "Wonder",
      "paras": [
        "The one positive emotional default reachable without delusion — awe joined to critical analysis before a hard world; the affective root of philosophy. Answers Theory across the equator."
      ]
    },
    "harmony": {
      "title": "Harmony",
      "paras": [
        "Sustained right proportion, requiring both power and grace in measure — the settled balance meaning comes into when its parts are held together. It is secured from the spine by Temperance, a higher virtue than grace or freedom for the keeping of harmony. Answers Existence across the equator."
      ]
    },
    "quintessence": {
      "title": "Quintessence",
      "paras": [
        "The reachable universal essence — the intrinsic nature of things beyond their physical form, dived for in imagination and surfaced as a pearl of understanding. It is bounded against Transcendence: theology has quintessence but not transcendence, and its discipline is to reach the universal essence without claiming the genuinely transcendent beyond. Answers Autopoiesis across the equator."
      ]
    },
    "faith": {
      "title": "Faith",
      "paras": [
        "Pragmatic, formative belief — a chosen orientation written into the soul for its shaping effect, held honestly alongside not-knowing. Not certainty but the voluntary trust that forms a self; the affective root of theology. Answers Individuation across the equator."
      ]
    },
    "connection": {
      "title": "Connection",
      "paras": [
        "The bond of relation and belonging — our placement in the web of others, the tie by which meaning binds persons to one another and to the whole. The lowest western term, where meaning grounds into conduct; the meaning-side counterpart to Freedom’s liberty. Answers Freedom across the equator."
      ]
    },
    "relativity": {
      "title": "Relativity",
      "paras": [
        "The frame-dependence of order — that any observation is defined relative to a reference and never grasped absolutely. The highest eastern term, and the objective relativity answering Abstraction’s subjective modelling; together they are the relative, abstracted nature of all knowledge. Answers Abstraction across the equator."
      ]
    },
    "theory": {
      "title": "Theory",
      "paras": [
        "The conscious recognition of natural pattern — the model-building born of an identity engaging the medium of its work, the structured cognition science runs on. The cognitive counterpart to Wonder’s awe. Answers Wonder across the equator."
      ]
    },
    "existence": {
      "title": "Existence",
      "paras": [
        "What is observed to have properties — space, time, and properties: the bedrock the rational order is read off of. Answers Harmony across the equator."
      ]
    },
    "autopoiesis": {
      "title": "Autopoiesis",
      "paras": [
        "Self-creation — the gradual self-making by which a self conditions and produces itself, bit by bit; the engine of alchemical transformation. Answers Quintessence across the equator."
      ]
    },
    "individuation": {
      "title": "Individuation",
      "paras": [
        "The carving of one’s own nature through testing and relation, until one ceases testing and abides by one’s own nature — the becoming-oneself that alchemy works toward. Answers Faith across the equator."
      ]
    },
    "freedom": {
      "title": "Freedom",
      "paras": [
        "The fundamental power to choose — the ground of trust between persons and of a collective’s capacity to organise; the lowest eastern term, where rational order grounds into liberated conduct. Answers Connection across the equator."
      ]
    },
    "philosophy": {
      "title": "Philosophy ♠",
      "paras": [
        "The mode of the north-west quadrant. Material: Cosmos × Mythos — the world-as-it-is met with meaning. Method: Logic × Nuance — reason joined to sensitivity for the particular. Its prime attribute is Wonder; its prime expression That-Which, the gesture that points at and names what a thing fundamentally is. Philosophy is the wonder-led interpretation of the world’s processes, structured by reason yet attentive to the particular. Its discipline: absurd structure but not naturalism — it keeps the definite structures found within an absurd process but refuses to reduce meaning to mere nature."
      ]
    },
    "science": {
      "title": "Science ♦",
      "paras": [
        "The mode of the north-east quadrant. Material: Cosmos × Logos — the world-as-it-is met with order. Method: Logic × Prudence — reason joined to practical wisdom. Its prime attribute is Theory; its prime expression Is-As, the predicative modelling that says what a thing behaves or can be cast as. Science is the replicable logic of prediction applied in experiment, the model tested against the real. Its discipline: relativity but not correlation — it keeps the frame-dependence of observation but refuses to mistake correlation for law."
      ]
    },
    "theology": {
      "title": "Theology ♥",
      "paras": [
        "The mode of the south-west quadrant. Material: Ethos × Mythos — conduct met with meaning. Method: Nuance × Humility — sensitivity joined to surrender. Its prime attribute is Faith; its prime expression May-Be, the subjunctive of possibility and hope that holds what may be without asserting it. Theology is the faith-led holding of meaning before the mystery, shaping conduct through what is humbly believed. Its discipline: quintessence but not transcendence — it dives for the reachable universal essence but refuses to claim the genuinely transcendent beyond."
      ]
    },
    "alchemy": {
      "title": "Alchemy ♣",
      "paras": [
        "The mode of the south-east quadrant. Material: Ethos × Logos — conduct met with order. Method: Prudence × Humility — practical wisdom joined to surrender. Its prime attribute is Individuation; its prime expression Un-Like, the transformative un-likening by which a self is made other than it was. Alchemy is the shaping of the soul, the self worked toward its own nature and guided toward reality with love of freedom. Its discipline: autopoiesis but not induction — it makes the self by gradual self-creation but refuses to derive it from general rule."
      ]
    }
  };

  // The line of small capitals above each definition — where the term sits.
  const KICKER = {
    agape:'The centre', nuance:'Hub virtue', prudence:'Hub virtue', logic:'Pole virtue', humility:'Pole virtue',
    acceptance:'Returning condition', attunement:'Returning condition',
    cosmos:'Anchor · world', logos:'Anchor · world', mythos:'Anchor · world', ethos:'Anchor · world',
    amplitude:'Perfected pole', chaos:'Perfected pole',
    way:'Inner ascent', doubt:'Inner ascent', evidence:'Inner ascent',
    grace:'Inner descent', compassion:'Inner descent', forgiveness:'Inner descent',
    temperance:'Upper cap', adaptation:'Upper cap', multiplicity:'Upper cap', kingdom:'Upper terminus',
    kenosis:'Lower cap', evolution:'Lower cap', being:'Lower cap', void:'Lower terminus',
    abstraction:'Western column', wonder:'Western column', harmony:'Western column', quintessence:'Western column', faith:'Western column', connection:'Western column',
    relativity:'Eastern column', theory:'Eastern column', existence:'Eastern column', autopoiesis:'Eastern column', individuation:'Eastern column', freedom:'Eastern column',
    philosophy:'Mode · north-west', science:'Mode · north-east', theology:'Mode · south-west', alchemy:'Mode · south-east'
  };

  // --- Drawer ---------------------------------------------------------------

  const figure = document.querySelector(".compass-figure");
  const doc = document.querySelector(".compass-doc");
  if (!figure) return;

  const scrim = document.createElement("div");
  scrim.className = "cmp-scrim";
  scrim.setAttribute("data-open", "false");

  const panel = document.createElement("aside");
  panel.className = "cmp-panel";
  panel.setAttribute("data-open", "false");
  panel.setAttribute("aria-label", "Definition");
  panel.innerHTML =
    '<button class="cmp-close" type="button" aria-label="Close">×</button>' +
    '<p class="cmp-kicker"></p>' +
    '<h2 class="cmp-title"></h2>' +
    '<div class="cmp-rule"></div>' +
    '<div class="cmp-body"></div>';

  document.body.appendChild(scrim);
  document.body.appendChild(panel);

  const kickerEl = panel.querySelector(".cmp-kicker");
  const titleEl = panel.querySelector(".cmp-title");
  const bodyEl = panel.querySelector(".cmp-body");

  let active = null;

  // A definition may open with a labelled lead — "Opens onto.", "Perfected.",
  // "As image.", "As light.", "Deep face — Pistis." — which is set apart.
  const LEAD = /^(Opens onto\.|Perfected\.|As image\.|As light\.|Deep face — [A-Za-z]+\.)/;

  function open(term, node) {
    const d = DEFS[term];
    if (!d) return;

    if (active) active.removeAttribute("data-active");
    active = node || null;
    if (active) active.setAttribute("data-active", "");

    kickerEl.textContent = KICKER[term] || "";
    titleEl.textContent = d.title;

    bodyEl.textContent = "";
    d.paras.forEach(function (text) {
      const m = text.match(LEAD);
      const p = document.createElement("p");
      if (m) {
        const em = document.createElement("em");
        em.className = "cmp-lead";
        em.textContent = m[1];
        p.appendChild(em);
        p.appendChild(document.createTextNode(text.slice(m[1].length)));
      } else {
        p.textContent = text;
      }
      bodyEl.appendChild(p);
    });

    panel.setAttribute("data-open", "true");
    scrim.setAttribute("data-open", "true");
    panel.scrollTop = 0;
  }

  function close() {
    if (active) {
      active.removeAttribute("data-active");
      active = null;
    }
    panel.setAttribute("data-open", "false");
    scrim.setAttribute("data-open", "false");
  }

  // --- Wiring ---------------------------------------------------------------

  // Terms on the plate.
  figure.addEventListener("click", function (e) {
    const t = e.target.closest("[data-term]");
    if (t) open(t.getAttribute("data-term"), t);
    else close();
  });

  // Keyboard reach: every term on the plate is focusable and answers Enter.
  figure.querySelectorAll("[data-term]").forEach(function (t) {
    t.setAttribute("tabindex", "0");
    t.setAttribute("role", "button");
    t.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(t.getAttribute("data-term"), t);
      }
    });
  });

  panel.querySelector(".cmp-close").addEventListener("click", close);
  scrim.addEventListener("click", close);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel.getAttribute("data-open") === "true") close();
  });

  if (!doc) return;

  // A bolded term in the document opens that term and brings the plate back
  // into view, so the definition is always read against the figure.
  doc.addEventListener("click", function (e) {
    const t = e.target.closest(".dv-term");
    if (!t) return;
    const key = t.getAttribute("data-goto");
    const node = figure.querySelector('[data-term="' + key + '"]');
    figure.scrollIntoView({ behavior: "smooth", block: "center" });
    open(key, node);
  });

  // --- Contents -------------------------------------------------------------

  // Built from the document's own section headings rather than hand-listed,
  // so a new section appears in the contents by being written.
  const heads = doc.querySelectorAll(".dv-h1");
  if (!heads.length) return;

  const toc = document.createElement("ul");
  toc.className = "dv-toc";

  heads.forEach(function (h, i) {
    h.id = "compass-sec-" + i;
    const li = document.createElement("li");
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = h.textContent;
    b.addEventListener("click", function () {
      h.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    li.appendChild(b);
    toc.appendChild(li);
  });

  doc.insertBefore(toc, doc.querySelector(".dv-head").nextSibling);
})();
