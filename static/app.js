const CATEGORY_ORDER = ["head", "body", "hands", "legs", "jewelry"];
const CATEGORY_LABELS = {
  head: "Head",
  body: "Body",
  hands: "Hands",
  legs: "Legs",
  jewelry: "Jewelry",
};
const SUBCATEGORY_ORDER = {
  head: ["cap", "helmet", "coif", "hood", "collar"],
  body: ["tunic", "gambeson", "chainmail", "plate", "coat"],
  hands: ["sleeves", "gloves"],
  legs: ["hose", "padded hose", "cuisses", "shoes", "spurs"],
  jewelry: ["ring", "necklace"],
};
const SUBCATEGORY_LABELS = {
  cap: "Cap",
  helmet: "Helmet",
  coif: "Coif",
  hood: "Hood",
  collar: "Collar",
  tunic: "Tunic",
  gambeson: "Gambeson",
  chainmail: "Chainmail",
  plate: "Plate",
  coat: "Coat",
  sleeves: "Sleeves",
  gloves: "Gloves",
  hose: "Hose",
  "padded hose": "Padded hose",
  cuisses: "Cuisses",
  shoes: "Shoes",
  spurs: "Spurs",
  ring: "Ring",
  necklace: "Necklace",
};

const TOTAL_COLUMNS = 11;
const NUMERIC_FIELDS = new Set([
  'stab_defense',
  'slash_defense',
  'blunt_defense',
  'conspicuousness',
  'noise',
  'visibility',
  'charisma',
]);


const FALLBACK_ICON_SRC = "/static/icons/_missing.png";
const DISALLOWED_ICON_SRCS = new Set([
  "/static/icons/trafficCone.png",
  "static/icons/trafficCone.png",
  "trafficCone.png",
  "trafficCone",
]);

const EXCLUDED_SUBCATEGORIES = new Set(["belt"]);
const HEAD_HELMET_KEYWORDS = [
  "helm",
  "helmet",
  "bascinet",
  "kettle hat",
  "kettle",
  "sallet",
  "klappvisor",
  "klappvisier",
  "klappvisor",
  "visor",
  "nasal",
  "aventail helm",
  "barbute",
  "armet",
  "war hat",
  "great helm",
  "crown",
  "casque",
];
const HEAD_CAP_KEYWORDS = [
  "cap",
  "hat",
  "mask",
  "veil",
  "bonnet",
  "circlet",
  "beret",
  "coifless",
  "hoodless",
];
const HEAD_COIF_KEYWORDS = ["coif"];
const HEAD_HOOD_KEYWORDS = ["hood", "cowl", "chaperon"];
const HEAD_COLLAR_KEYWORDS = ["collar", "gorget"];

const BODY_PLATE_KEYWORDS = [
  "plate",
  "brigandine",
  "cuirass",
  "plackart",
  "cuirboilli",
  "breastplate",
  "lamellar",
];
const BODY_CHAINMAIL_KEYWORDS = ["chainmail", "chain mail", "hauberk", "mailshirt", "mail coat", "haubergeon"];
const BODY_GAMBESON_KEYWORDS = [
  "gambeson",
  "aketon",
  "pourpoint",
  "arming doublet",
  "arming jacket",
  "padded jack",
  "quilted",
  "stuffed",
  "arming coat",
];
const BODY_COAT_KEYWORDS = [
  "coat",
  "cloak",
  "tabard",
  "surcoat",
  "dress",
  "robe",
  "gown",
  "habit",
  "waffenrock",
  "doublet",
  "jerkin",
  "jacket",
];

const PADDED_HOSE_KEYWORDS = ["padded", "quilted", "arming", "aketon", "stuffed", "gambeson"];
const normalizeText = (value) =>
  (value || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const buildItemText = (item) =>
  normalizeText(
    [item.name, item.alt_id, item.category, item.slot_subcategory, item.icon_id]
      .filter(Boolean)
      .join(" ")
  );

const textContainsAny = (text, keywords) =>
  keywords.some((keyword) => text.includes(keyword));

const shouldExcludeItem = (item, textOverride) => {
  const normalizedSubcat = (item.slot_subcategory || "").toLowerCase();
  if (EXCLUDED_SUBCATEGORIES.has(normalizedSubcat)) {
    return true;
  }
  const text = textOverride ?? buildItemText(item);
  return text.includes("scabbard") || text.includes("longsword") || text.includes("shortsword");
};

const deriveHeadSubcategory = (text, normalizedSubcat) => {
  if (normalizedSubcat === "collar" || textContainsAny(text, HEAD_COLLAR_KEYWORDS)) {
    return "collar";
  }
  if (normalizedSubcat === "coif" || textContainsAny(text, HEAD_COIF_KEYWORDS)) {
    return "coif";
  }
  if (normalizedSubcat === "hood" || textContainsAny(text, HEAD_HOOD_KEYWORDS)) {
    return "hood";
  }
  if (textContainsAny(text, HEAD_HELMET_KEYWORDS)) {
    return "helmet";
  }
  if (textContainsAny(text, HEAD_CAP_KEYWORDS)) {
    return "cap";
  }
  return "cap";
};

const deriveBodySubcategory = (text, normalizedSubcat) => {
  if (normalizedSubcat === "plate" || textContainsAny(text, BODY_PLATE_KEYWORDS)) {
    return "plate";
  }
  if (normalizedSubcat === "chainmail" || textContainsAny(text, BODY_CHAINMAIL_KEYWORDS)) {
    return "chainmail";
  }
  if (textContainsAny(text, BODY_GAMBESON_KEYWORDS)) {
    return "gambeson";
  }
  if (
    normalizedSubcat === "coat" ||
    normalizedSubcat === "dress" ||
    textContainsAny(text, BODY_COAT_KEYWORDS)
  ) {
    return "coat";
  }
  return "tunic";
};

const deriveHandsSubcategory = (normalizedSubcat, text) => {
  if (normalizedSubcat === "sleeved" || text.includes("sleeve")) {
    return "sleeves";
  }
  return "gloves";
};

const deriveLegSubcategory = (normalizedSubcat, text) => {
  if (normalizedSubcat === "cuisses") {
    return "cuisses";
  }
  if (normalizedSubcat === "shoes") {
    return "shoes";
  }
  if (normalizedSubcat === "spurs") {
    return "spurs";
  }
  if (normalizedSubcat === "hose") {
    if (textContainsAny(text, PADDED_HOSE_KEYWORDS)) {
      return "padded hose";
    }
    return "hose";
  }
  return null;
};

const deriveDisplaySlot = (item) => {
  const text = buildItemText(item);
  if (shouldExcludeItem(item, text)) {
    return null;
  }
  const normalizedCategory = (item.slot_category || "").toLowerCase();
  const normalizedSubcat = (item.slot_subcategory || "").toLowerCase();

  if (normalizedSubcat === "ring") {
    return { category: "jewelry", subcategory: "ring" };
  }

  if (normalizedSubcat === "necklace") {
    return { category: "jewelry", subcategory: "necklace" };
  }

  if (normalizedCategory === "head") {
    return {
      category: "head",
      subcategory: deriveHeadSubcategory(text, normalizedSubcat),
    };
  }

  if (normalizedCategory === "body") {
    return {
      category: "body",
      subcategory: deriveBodySubcategory(text, normalizedSubcat),
    };
  }

  if (normalizedCategory === "arms") {
    return {
      category: "hands",
      subcategory: deriveHandsSubcategory(normalizedSubcat, text),
    };
  }

  if (normalizedCategory === "legs") {
    const subcategory = deriveLegSubcategory(normalizedSubcat, text);
    if (!subcategory) {
      return null;
    }
    return {
      category: "legs",
      subcategory,
    };
  }

  return null;
};

const flattenIconCandidates = (candidates) => {
  const flat = [];
  candidates.forEach((candidate) => {
    if (Array.isArray(candidate)) {
      candidate.forEach((nested) => {
        if (typeof nested === "string" && nested.length) {
          flat.push(nested);
        }
      });
    } else if (typeof candidate === "string" && candidate.length) {
      flat.push(candidate);
    }
  });
  return flat;
};

const selectIconFromCandidates = (
  candidates,
  { allowDisallowedFallback = false } = {}
) => {
  const flat = flattenIconCandidates(candidates);
  const preferred = flat.find((src) => !DISALLOWED_ICON_SRCS.has(src));
  if (preferred) {
    return preferred;
  }
  if (allowDisallowedFallback) {
    const disallowed = flat.find((src) => DISALLOWED_ICON_SRCS.has(src));
    if (disallowed) {
      return disallowed;
    }
  }
  return preferred || FALLBACK_ICON_SRC;
};

const getItemIconCandidates = (item) => [
  item.slot_icon,
  item.slotIcon,
  item.icon,
];

const state = {
  search: "",
  sort: "name",
  direction: "asc",
  items: [],
  openCategories: new Set(),
  openSubcategories: new Set(),
  openVariants: new Set(),
};

const searchInput = document.getElementById("searchInput");
const itemsBody = document.getElementById("itemsBody");
const statusMessage = document.getElementById("statusMessage");
const sortButtons = document.querySelectorAll("button[data-sort]");

let debounceTimer = null;

const formatNumber = (value) => (typeof value === "number" ? value : "-");

const resolveSlotBuckets = (item) => deriveDisplaySlot(item);

const groupItems = (items) => {
  const grouped = {};
  items.forEach((item) => {
    const resolved = resolveSlotBuckets(item);
    if (!resolved) {
      return;
    }
    const { category, subcategory } = resolved;
    if (!grouped[category]) grouped[category] = {};
    if (!grouped[category][subcategory]) grouped[category][subcategory] = [];
    grouped[category][subcategory].push(item);
  });
  return grouped;
};

const createIconCell = (item) => {
  const img = document.createElement("img");
  img.src = item.icon;
  img.alt = item.name;
  img.loading = "lazy";
  img.onerror = () => {
    img.src = "/static/icons/_missing.png";
  };
  const td = document.createElement("td");
  td.className = "icon-cell";
  td.appendChild(img);
  return td;
};

const createValueCell = (value, className) => {
  const td = document.createElement("td");
  if (className) td.className = className;
  td.textContent = value;
  return td;
};

const createGroupRow = ({
  label,
  count,
  onClick,
  className,
  iconSrc,
  iconAlt,
  iconClass,
}) => {
  const tr = document.createElement("tr");
  tr.className = className;
  const td = document.createElement("td");
  td.colSpan = TOTAL_COLUMNS;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "group-toggle";
  const toggleSpan = document.createElement("span");
  toggleSpan.className = "toggle-icon";
  button.appendChild(toggleSpan);

  if (iconSrc) {
    const icon = document.createElement("img");
    icon.src = iconSrc;
    icon.alt = iconAlt || label;
    icon.loading = "lazy";
    icon.onerror = () => {
      icon.src = "/static/icons/_missing.png";
    };
    icon.className = iconClass || "group-icon";
    button.appendChild(icon);
  }

  const labelSpan = document.createElement("span");
  labelSpan.textContent = label;
  button.appendChild(labelSpan);

  const countSpan = document.createElement("span");
  countSpan.className = "group-count";
  countSpan.textContent = `(${count})`;
  button.appendChild(countSpan);

  button.addEventListener("click", onClick);
  td.appendChild(button);
  tr.appendChild(td);
  return tr;
};

const renderRows = (items) => {
  itemsBody.innerHTML = "";
  state.items = items;

  const grouped = groupItems(items);
  const orderedCategories = [
    ...CATEGORY_ORDER,
    ...Object.keys(grouped).filter((cat) => !CATEGORY_ORDER.includes(cat)),
  ];
  let visibleCount = 0;

  orderedCategories.forEach((category) => {
    const subcats = grouped[category];
    if (!subcats) return;

    const catId = `cat-${category}`;
    const catOpen = state.openCategories.has(catId);
    const catCount = Object.values(subcats).reduce(
      (acc, entries) => acc + entries.length,
      0
    );
    visibleCount += catCount;
    const catRow = createGroupRow({
      label: CATEGORY_LABELS[category] ?? category,
      count: catCount,
      onClick: () => toggleCategory(catId),
      className: `group-row category-row ${catOpen ? "expanded" : "collapsed"}`,
    });
    itemsBody.appendChild(catRow);

    const subOrder = SUBCATEGORY_ORDER[category] || [];
    const orderedSubcats = Object.entries(subcats).sort((a, b) => {
      const aIdx = subOrder.indexOf(a[0]);
      const bIdx = subOrder.indexOf(b[0]);
      return (aIdx === -1 ? subOrder.length : aIdx) -
        (bIdx === -1 ? subOrder.length : bIdx);
    });

    orderedSubcats.forEach(([subcategory, entries]) => {
      const subId = `${catId}::${subcategory}`;
      const subOpen = state.openSubcategories.has(subId);
      const subIcon = selectIconFromCandidates(
        entries.map(getItemIconCandidates)
      );
      const subRow = createGroupRow({
        label: SUBCATEGORY_LABELS[subcategory] ?? subcategory,
        count: entries.length,
        iconSrc: subIcon,
        iconAlt: `${SUBCATEGORY_LABELS[subcategory] ?? subcategory} slot icon`,
        iconClass: "group-icon subcategory-icon",
        onClick: () => toggleSubcategory(subId),
        className: [
          "group-row",
          "subcategory-row",
          catOpen ? "" : "hidden-row",
          subOpen ? "expanded" : "collapsed",
        ]
          .filter(Boolean)
          .join(" "),
      });
      subRow.dataset.parent = catId;
      itemsBody.appendChild(subRow);

      const variantGroups = buildVariantGroups(entries);
      variantGroups.forEach((group) => {
        const variantKey = `${subId}::variant::${group.key}`;
        const variantOpen = state.openVariants.has(variantKey);
        const variantItemIcons = group.items
          .map((item) => item.icon)
          .filter(Boolean);
        const preferredVariantIcon =
          variantItemIcons.find(
            (iconPath) => iconPath && iconPath !== FALLBACK_ICON_SRC
          ) ||
          (subIcon && subIcon !== FALLBACK_ICON_SRC ? subIcon : null) ||
          variantItemIcons[0] ||
          subIcon ||
          FALLBACK_ICON_SRC;
        const variantFallbacks = [
          ...variantItemIcons.filter((iconPath) => iconPath !== preferredVariantIcon),
        ];
        if (subIcon && subIcon !== preferredVariantIcon) {
          variantFallbacks.push(subIcon);
        }
        const variantRow = createVariantRow({
          label: group.label,
          count: group.items.length,
          iconSrc: preferredVariantIcon,
          iconFallbacks: variantFallbacks,
          onClick: () => toggleVariant(variantKey),
          className: [
            "group-row",
            "variant-row",
            catOpen && subOpen ? "" : "hidden-row",
            variantOpen ? "expanded" : "collapsed",
          ]
            .filter(Boolean)
            .join(" "),
        });
        variantRow.dataset.parent = subId;
        itemsBody.appendChild(variantRow);

        group.items.forEach((item) => {
          const itemRow = document.createElement("tr");
          itemRow.className = [
            "item-row",
            catOpen && subOpen && variantOpen ? "" : "hidden-row",
          ]
            .filter(Boolean)
            .join(" ");
          itemRow.dataset.parent = variantKey;

          itemRow.appendChild(createIconCell(item));
          itemRow.appendChild(createValueCell(item.name, "item-name"));
          itemRow.appendChild(createValueCell(formatNumber(item.stab_defense)));
          itemRow.appendChild(
            createValueCell(formatNumber(item.slash_defense))
          );
          itemRow.appendChild(
            createValueCell(formatNumber(item.blunt_defense))
          );
          itemRow.appendChild(
            createValueCell(formatNumber(item.conspicuousness))
          );
          itemRow.appendChild(createValueCell(formatNumber(item.noise)));
          itemRow.appendChild(createValueCell(formatNumber(item.visibility)));
          itemRow.appendChild(createValueCell(formatNumber(item.charisma)));
          itemRow.appendChild(createValueCell(item.alt_id, "alt-id"));
          itemRow.appendChild(createValueCell(item.item_id, "item-code"));

          itemsBody.appendChild(itemRow);
        });
      });
    });
  });

  statusMessage.textContent = items.length
    ? `${items.length} item(s) loaded`
    : "No items found. Try a different search.";
};

const updateSortIndicators = () => {
  sortButtons.forEach((button) => {
    const indicator = button.querySelector(".sort-indicator");
    if (indicator) indicator.remove();

    if (button.dataset.sort === state.sort) {
      const span = document.createElement("span");
      span.className = "sort-indicator";
      span.textContent = state.direction === "asc" ? "\u2191" : "\u2193";
      button.appendChild(span);
    }
  });
};

const buildQuery = () => {
  const params = new URLSearchParams();
  if (state.search) params.set("search", state.search);
  params.set("sort", state.sort);
  params.set("direction", state.direction);
  return params.toString();
};

const fetchItems = async (resetState = false) => {
  statusMessage.textContent = "Loading items...";
  try {
    const response = await fetch(`/api/items?${buildQuery()}`);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    if (resetState) {
      state.openCategories.clear();
      state.openSubcategories.clear();
      state.openVariants.clear();
    }
    renderRows(data);
  } catch (error) {
    console.error(error);
    statusMessage.textContent = "Failed to load items. Check the server logs.";
  }
};

const requestItems = (resetState = false) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => fetchItems(resetState), 250);
};

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value.trim();
  requestItems(true);
});

sortButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const column = button.dataset.sort;
    if (state.sort === column) {
      state.direction = state.direction === "asc" ? "desc" : "asc";
    } else {
      state.sort = column;
      state.direction = "asc";
    }
    updateSortIndicators();
    fetchItems(false);
  });
});

updateSortIndicators();
fetchItems(true);

function toggleCategory(catId) {
  if (state.openCategories.has(catId)) {
    state.openCategories.delete(catId);
    [...state.openSubcategories].forEach((subId) => {
      if (subId.startsWith(`${catId}::`)) {
        state.openSubcategories.delete(subId);
      }
    });
    [...state.openVariants].forEach((variantId) => {
      if (variantId.startsWith(`${catId}::`)) {
        state.openVariants.delete(variantId);
      }
    });
  } else {
    state.openCategories.add(catId);
  }
  renderRows(state.items);
}

function toggleSubcategory(subId) {
  const [catId] = subId.split("::");
  state.openCategories.add(catId);
  if (state.openSubcategories.has(subId)) {
    state.openSubcategories.delete(subId);
    [...state.openVariants].forEach((variantId) => {
      if (variantId.startsWith(`${subId}::variant::`)) {
        state.openVariants.delete(variantId);
      }
    });
  } else {
    state.openSubcategories.add(subId);
  }
  renderRows(state.items);
}

function toggleVariant(variantId) {
  if (state.openVariants.has(variantId)) {
    state.openVariants.delete(variantId);
  } else {
    state.openVariants.add(variantId);
  }
  renderRows(state.items);
}

function buildVariantGroups(items) {
  const map = new Map();
  items.forEach((item) => {
    const normalizedName = (item.name || "").toLowerCase().trim();
    const key = normalizedName || item.alt_group || item.alt_id || item.item_id;
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(item);
  });
  const comparator = createComparator(state.sort, state.direction);
  return Array.from(map.entries())
    .map(([key, variants]) => {
      const sortedVariants = [...variants].sort(comparator);
      const groupIcon = selectIconFromCandidates(
        sortedVariants.map(getItemIconCandidates),
        { allowDisallowedFallback: true }
      );
      return {
        key,
        label: sortedVariants[0].name,
        icon: groupIcon,
        items: sortedVariants,
      };
    })
    .sort((a, b) => comparator(a.items[0], b.items[0]));
}

function getSortValue(item, field) {
  if (NUMERIC_FIELDS.has(field)) {
    const value = Number(item[field]);
    return Number.isNaN(value) ? 0 : value;
  }
  return (item[field] ?? "").toString().toLowerCase();
}

function compareValues(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function createComparator(field, direction) {
  const dir = direction === "desc" ? -1 : 1;
  return (a, b) => {
    const valueA = getSortValue(a, field);
    const valueB = getSortValue(b, field);
    let result = compareValues(valueA, valueB);
    if (result === 0 && field !== "name") {
      result = compareValues(
        a.name.toLowerCase(),
        b.name.toLowerCase()
      );
    }
    return result * dir;
  };
}
const createVariantRow = ({
  label,
  count,
  onClick,
  className,
  iconSrc,
  iconFallbacks = [],
}) => {
  const tr = document.createElement("tr");
  tr.className = className;
  const td = document.createElement("td");
  td.colSpan = TOTAL_COLUMNS;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "group-toggle variant-toggle";
  const toggleSpan = document.createElement("span");
  toggleSpan.className = "toggle-icon";
  button.appendChild(toggleSpan);
  const icon = document.createElement("img");
  icon.src = iconSrc || FALLBACK_ICON_SRC;
  icon.alt = label;
  icon.loading = "lazy";
  const fallbackQueue = iconFallbacks.filter((src) => src && src !== iconSrc);
  icon.onerror = () => {
    if (fallbackQueue.length) {
      icon.src = fallbackQueue.shift();
    } else {
      icon.src = FALLBACK_ICON_SRC;
    }
  };
  icon.className = "variant-icon";
  button.appendChild(icon);
  const labelSpan = document.createElement("span");
  labelSpan.textContent = label;
  button.appendChild(labelSpan);
  const countSpan = document.createElement("span");
  countSpan.className = "group-count";
  countSpan.textContent = `(${count})`;
  button.appendChild(countSpan);
  button.addEventListener("click", onClick);
  td.appendChild(button);
  tr.appendChild(td);
  return tr;
};


