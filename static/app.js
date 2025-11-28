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
  body: ["tunic", "gambeson", "chainmail", "plate", "coat", "waffenrock"],
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
  waffenrock: "Waffenrock",
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

const HORSE_CATEGORY_ORDER = ["torso", "bridle", "saddle", "horseshoe", "chanfron"];
const HORSE_CATEGORY_LABELS = {
  torso: "Torso",
  bridle: "Bridle",
  saddle: "Saddle",
  horseshoe: "Horseshoe",
  chanfron: "Chanfron",
};

const ARMOR_TABLE_COLUMNS = [
  { id: "icon", label: "Icon", type: "icon" },
  { id: "name", label: "Name", type: "name", sortable: true, sortKey: "name" },
  { id: "stab_defense", label: "Stab", type: "number", sortable: true, sortKey: "stab_defense" },
  { id: "slash_defense", label: "Slash", type: "number", sortable: true, sortKey: "slash_defense" },
  { id: "blunt_defense", label: "Blunt", type: "number", sortable: true, sortKey: "blunt_defense" },
  { id: "conspicuousness", label: "Consp.", type: "number", sortable: true, sortKey: "conspicuousness" },
  { id: "noise", label: "Noise", type: "number", sortable: true, sortKey: "noise" },
  { id: "visibility", label: "Visibility", type: "number", sortable: true, sortKey: "visibility" },
  { id: "charisma", label: "Charisma", type: "number", sortable: true, sortKey: "charisma" },
  { id: "price", label: "Price", type: "number", sortable: true, sortKey: "price" },
  { id: "item_id", label: "Item ID", type: "text", sortable: true, sortKey: "item_id", className: "item-code" },
  { id: "alt_id", label: "Alt ID", type: "text", className: "alt-id" },
];

const HORSE_TABLE_COLUMNS = [
  { id: "icon", label: "Icon", type: "icon" },
  { id: "name", label: "Name", type: "name", sortable: true, sortKey: "name" },
  { id: "slash_defense", label: "Slash", type: "number", sortable: true, sortKey: "slash_defense" },
  { id: "stab_defense", label: "Stab", type: "number", sortable: true, sortKey: "stab_defense" },
  { id: "blunt_defense", label: "Blunt", type: "number", sortable: true, sortKey: "blunt_defense" },
  { id: "courage", label: "Courage", type: "number", sortable: true, sortKey: "courage" },
  { id: "capacity", label: "Capacity", type: "number", sortable: true, sortKey: "capacity" },
  { id: "stamina", label: "Stamina", type: "number", sortable: true, sortKey: "stamina" },
  { id: "speed", label: "Speed", type: "number", sortable: true, sortKey: "speed" },
  { id: "price", label: "Price", type: "number", sortable: true, sortKey: "price" },
  { id: "item_id", label: "Item ID", type: "text", sortable: true, sortKey: "item_id", className: "item-code" },
  { id: "alt_id", label: "Alt ID", type: "text", className: "alt-id" },
];

const WEAPON_TABLE_COLUMNS = [
  { id: "icon", label: "Icon", type: "icon" },
  { id: "name", label: "Name", type: "name", sortable: true, sortKey: "name" },
  { id: "slash_damage", label: "Slash", type: "number", sortable: true, sortKey: "slash_damage" },
  { id: "stab_damage", label: "Stab", type: "number", sortable: true, sortKey: "stab_damage" },
  { id: "blunt_damage", label: "Blunt", type: "number", sortable: true, sortKey: "blunt_damage" },
  { id: "weapon_defense", label: "Defense", type: "number", sortable: true, sortKey: "weapon_defense" },
  { id: "durability", label: "Durability", type: "number", sortable: true, sortKey: "durability" },
  { id: "reach", label: "Reach", type: "number", sortable: true, sortKey: "reach" },
  { id: "weapon_speed", label: "Speed", type: "number", sortable: true, sortKey: "weapon_speed" },
  { id: "weight", label: "Weight", type: "number", sortable: true, sortKey: "weight" },
  { id: "strength_requirement", label: "STR", type: "number", sortable: true, sortKey: "strength_requirement" },
  { id: "agility_requirement", label: "AGI", type: "number", sortable: true, sortKey: "agility_requirement" },
  { id: "price", label: "Price", type: "number", sortable: true, sortKey: "price" },
  { id: "item_id", label: "Item ID", type: "text", sortable: true, sortKey: "item_id", className: "item-code" },
  { id: "alt_id", label: "Alt ID", type: "text", className: "alt-id" },
];

const WEAPON_TYPE_ORDER = [
  "longsword",
  "shortsword",
  "saber",
  "sword",
  "axe",
  "mace",
  "hammer",
  "warhammer",
  "dagger",
  "polearm",
  "halberd",
  "spear",
  "bow",
  "crossbow",
  "shield",
  "other",
];

const WEAPON_TYPE_LABELS = {
  longsword: "Longswords",
  shortsword: "Shortswords",
  saber: "Sabers",
  sword: "Swords",
  axe: "Axes",
  mace: "Maces",
  hammer: "Hammers",
  warhammer: "War Hammers",
  dagger: "Daggers",
  polearm: "Polearms",
  halberd: "Halberds",
  spear: "Spears",
  bow: "Bows",
  crossbow: "Crossbows",
  shield: "Shields",
  other: "Other Weapons",
};

const WEAPON_KEYWORD_TYPES = [
  { type: "longsword", keywords: ["longsword", "greatsword", "twohanded sword", "two-handed sword"] },
  { type: "shortsword", keywords: ["shortsword", "short sword"] },
  { type: "saber", keywords: ["saber", "sabre"] },
  { type: "sword", keywords: ["sword"] },
  { type: "axe", keywords: ["axe", "ax"] },
  { type: "mace", keywords: ["mace"] },
  { type: "hammer", keywords: ["hammer", "maul"] },
  { type: "warhammer", keywords: ["warhammer", "war hammer"] },
  { type: "dagger", keywords: ["dagger", "knife"] },
  { type: "polearm", keywords: ["polearm", "poleaxe", "pole axe", "billhook", "bardiche"] },
  { type: "halberd", keywords: ["halberd"] },
  { type: "spear", keywords: ["spear", "pike", "lance"] },
  { type: "bow", keywords: ["bow", "longbow"] },
  { type: "crossbow", keywords: ["crossbow"] },
  { type: "shield", keywords: ["shield"] },
];

const NUMERIC_FIELDS = new Set([
  "stab_defense",
  "slash_defense",
  "blunt_defense",
  "stab_damage",
  "slash_damage",
  "blunt_damage",
  "weapon_defense",
  "durability",
  "reach",
  "weapon_speed",
  "conspicuousness",
  "noise",
  "visibility",
  "charisma",
  "courage",
  "capacity",
  "stamina",
  "speed",
  "weight",
  "strength_requirement",
  "agility_requirement",
  "price",
]);


const FALLBACK_ICON_SRC = "/static/icons/_missing.png";
const DISALLOWED_ICON_SRCS = new Set([
  "/static/icons/trafficCone.png",
  "static/icons/trafficCone.png",
  "trafficCone.png",
  "trafficCone",
]);

const PLACEHOLDER_NAME = "a suspicious bag";
const PLACEHOLDER_ICON_TOKEN = "trafficcone";
const PLACEHOLDER_REPLACEME = "replaceme.png";

const getCurrentColumns = () => {
  if (state?.itemType === "horse") {
    return HORSE_TABLE_COLUMNS;
  }
  if (state?.itemType === "weapon") {
    return WEAPON_TABLE_COLUMNS;
  }
  return ARMOR_TABLE_COLUMNS;
};

const getColumnCount = () => getCurrentColumns().length;

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
  "chaperon",
];
const HEAD_COIF_KEYWORDS = ["coif"];
const HEAD_HOOD_KEYWORDS = ["hood", "cowl"];
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
  "caftan",
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

const weaponTextContainsAny = (text, keywords) => {
  if (!text || !keywords?.length) return false;
  const tokens = text.match(/[a-z0-9]+/g) || [];
  return keywords.some((keyword) => {
    if (!keyword) return false;
    const normalizedKeyword = normalizeText(keyword).trim();
    if (!normalizedKeyword) return false;
    if (normalizedKeyword.includes(" ")) {
      return text.includes(normalizedKeyword);
    }
    return tokens.includes(normalizedKeyword);
  });
};

const mapWeaponTypeValue = (value) => {
  const normalized = normalizeText(value || "").trim();
  if (!normalized) return "";
  for (const entry of WEAPON_KEYWORD_TYPES) {
    if (weaponTextContainsAny(normalized, entry.keywords)) {
      return entry.type;
    }
  }
  return normalized;
};

const deriveWeaponType = (item) => {
  const fromSubcategory = mapWeaponTypeValue(item?.slot_subcategory);
  if (fromSubcategory) {
    return fromSubcategory;
  }
  const fallback = mapWeaponTypeValue(buildItemText(item));
  return fallback || "other";
};

const formatWeaponTypeLabel = (type) => {
  const normalized = normalizeText(type || "").trim();
  if (!normalized) return WEAPON_TYPE_LABELS.other;
  if (WEAPON_TYPE_LABELS[normalized]) {
    return WEAPON_TYPE_LABELS[normalized];
  }
  return normalized
    .split(" ")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
};

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

  if (normalizedCategory === "horse") {
    return {
      category: "horse",
      subcategory: normalizedSubcat || "torso",
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

function defaultTabPreferences() {
  return {
    search: "",
    hidePlaceholders: true,
    hideQuestItems: true,
    hideNoPrice: false,
  };
}

const tabPreferences = new Map();

function ensureTabPreferences(tab) {
  if (!tabPreferences.has(tab)) {
    tabPreferences.set(tab, defaultTabPreferences());
  }
  return tabPreferences.get(tab);
}

const state = {
  search: "",
  sort: "name",
  direction: "asc",
  itemType: "armor",
  items: [],
  openCategories: new Set(),
  openSubcategories: new Set(),
  openVariants: new Set(),
  hidePlaceholders: true,
  hideQuestItems: true,
  hideNoPrice: false,
  selectedAltId: "",
};

const tableHeadRow = document.querySelector("thead tr");
const searchInput = document.getElementById("searchInput");
const itemsBody = document.getElementById("itemsBody");
const statusMessage = document.getElementById("statusMessage");
const hidePlaceholderToggle = document.getElementById(
  "hidePlaceholderToggle"
);
const hideQuestToggle = document.getElementById("hideQuestToggle");
const hideNoPriceToggle = document.getElementById("hideNoPriceToggle");
const tabButtons = document.querySelectorAll(".hero-tab");
const copyCheatButton = document.getElementById("copyCheatButton");
let selectedRowElement = null;

let debounceTimer = null;

const isPlaceholderItem = (item) => {
  const iconPath = (item.icon || "").toLowerCase();
  const name = (item.name || "").toLowerCase();
  return (
    iconPath.includes(PLACEHOLDER_ICON_TOKEN) ||
    iconPath.endsWith(PLACEHOLDER_REPLACEME) ||
    name.includes(PLACEHOLDER_NAME)
  );
};

const isQuestItem = (item) => Boolean(item.is_quest_item);

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
  const command = buildCheatCommand(item);
  if (command) {
    img.classList.add("copyable-icon");
    img.title = `Copy: ${command}`;
    img.addEventListener("click", (event) => {
      event.stopPropagation();
      const row = event.currentTarget.closest("tr");
      if (row) {
        handleRowSelection(row, item);
      } else {
        state.selectedAltId = item.alt_id || item.item_id || "";
        updateCopyButton();
      }
      copyCheatCommand(command);
    });
  }
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

const createNameCell = (item) => {
  const td = document.createElement("td");
  td.className = "item-name";
  td.textContent = item.name;
  if (isQuestItem(item)) {
    const questBadge = document.createElement("span");
    questBadge.className = "item-pill quest-pill";
    questBadge.textContent = "Quest item";
    td.appendChild(questBadge);
  }
  return td;
};

const appendDataCells = (row, item) => {
  const columns = getCurrentColumns();
  columns.forEach((column) => {
    if (column.type === "icon") {
      row.appendChild(createIconCell(item));
      return;
    }
    if (column.type === "name") {
      row.appendChild(createNameCell(item));
      return;
    }
    if (column.type === "number") {
      row.appendChild(
        createValueCell(formatNumber(item[column.id]), column.className)
      );
      return;
    }
    row.appendChild(
      createValueCell(item[column.id] ?? "-", column.className)
    );
  });
};

const buildCheatCommand = (source) => {
  const altId =
    typeof source === "string"
      ? source
      : (source.alt_id || source.item_id || "").trim();
  if (!altId) return "";
  return `wh_cheat_addItem ${altId}`;
};

const handleRowSelection = (rowElement, item) => {
  if (selectedRowElement === rowElement) {
    return;
  }
  if (selectedRowElement) {
    selectedRowElement.classList.remove("selected-row");
  }
  selectedRowElement = rowElement;
  rowElement.classList.add("selected-row");
  state.selectedAltId = item.alt_id || item.item_id || "";
  updateCopyButton();
};

const updateCopyButton = () => {
  if (!copyCheatButton) return;
  const hasSelection = Boolean(state.selectedAltId);
  copyCheatButton.disabled = !hasSelection;
  copyCheatButton.textContent = hasSelection
    ? `Copy: ${buildCheatCommand(state.selectedAltId)}`
    : "Copy cheat command";
};

const writeToClipboard = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  return new Promise((resolve, reject) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      if (successful) {
        resolve();
      } else {
        reject(new Error("execCommand failed"));
      }
    } catch (err) {
      document.body.removeChild(textarea);
      reject(err);
    }
  });
};

const copyCheatCommand = async (command) => {
  try {
    await writeToClipboard(command);
    if (copyCheatButton) {
      copyCheatButton.textContent = "Copied!";
      setTimeout(updateCopyButton, 1200);
    }
  } catch (err) {
    console.error("Clipboard error", err);
    alert(command);
  }
};

const copySelectedCheat = () => {
  if (!state.selectedAltId) return;
  const command = buildCheatCommand(state.selectedAltId);
  if (!command) return;
  copyCheatCommand(command);
};

const attachSortButtonHandlers = () => {
  document.querySelectorAll("button[data-sort]").forEach((button) => {
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
};

function updateSortIndicators() {
  document.querySelectorAll("button[data-sort]").forEach((button) => {
    const indicator = button.querySelector(".sort-indicator");
    if (indicator) indicator.remove();

    if (button.dataset.sort === state.sort) {
      const span = document.createElement("span");
      span.className = "sort-indicator";
      span.textContent = state.direction === "asc" ? "\u2191" : "\u2193";
      button.appendChild(span);
    }
  });
}

const buildTableHeader = () => {
  if (!tableHeadRow) return;
  const columns = getCurrentColumns();
  tableHeadRow.innerHTML = "";
  columns.forEach((column) => {
    const th = document.createElement("th");
    if (column.sortable && column.sortKey) {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.sort = column.sortKey;
      button.textContent = column.label;
      th.appendChild(button);
    } else {
      th.textContent = column.label;
    }
    tableHeadRow.appendChild(th);
  });
  attachSortButtonHandlers();
  updateSortIndicators();
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
  td.colSpan = getColumnCount();
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
  state.selectedAltId = "";
  if (selectedRowElement) {
    selectedRowElement.classList.remove("selected-row");
    selectedRowElement = null;
  }
  updateCopyButton();

  const { workingItems, placeholderHidden, questHidden, priceHidden } =
    filterItemsByToggles(items);

  if (state.itemType === "horse") {
    renderHorseTable(workingItems);
  } else if (state.itemType === "weapon") {
    renderWeaponsTable(workingItems);
  } else {
    renderArmorTable(workingItems);
  }

  updateStatusMessage({
    totalCount: items.length,
    visibleCount: workingItems.length,
    placeholderHidden,
    questHidden,
    priceHidden,
  });
};

const filterItemsByToggles = (items) => {
  const workingItems = [];
  let placeholderHidden = 0;
  let questHidden = 0;
  let priceHidden = 0;
  items.forEach((item) => {
    if (state.hidePlaceholders && isPlaceholderItem(item)) {
      placeholderHidden += 1;
      return;
    }
    if (state.hideQuestItems && isQuestItem(item)) {
      questHidden += 1;
      return;
    }
    if (state.hideNoPrice) {
      const price = item.price;
      if (
        price === null ||
        price === undefined ||
        Number(price) === 0 ||
        Number.isNaN(Number(price))
      ) {
        priceHidden += 1;
        return;
      }
    }
    workingItems.push(item);
  });
  return { workingItems, placeholderHidden, questHidden, priceHidden };
};

const renderArmorTable = (items) => {
  const grouped = groupItems(items);
  const orderedCategories = [
    ...CATEGORY_ORDER,
    ...Object.keys(grouped).filter((cat) => !CATEGORY_ORDER.includes(cat)),
  ];

  orderedCategories.forEach((category) => {
    const subcats = grouped[category];
    if (!subcats) return;

    const catId = `cat-${category}`;
    const catOpen = state.openCategories.has(catId);
    const catCount = Object.values(subcats).reduce(
      (acc, entries) => acc + entries.length,
      0
    );
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
        let variantIcon = selectIconFromCandidates(
          group.items.map(getItemIconCandidates),
          { allowDisallowedFallback: true }
        );
        if (
          subIcon &&
          (!variantIcon || variantIcon === FALLBACK_ICON_SRC)
        ) {
          variantIcon = subIcon;
        }
        const variantFallbacks = [...variantItemIcons];
        if (subIcon && subIcon !== variantIcon) {
          variantFallbacks.push(subIcon);
        }
        const variantRow = createVariantRow({
          label: group.label,
          count: group.items.length,
          iconSrc: variantIcon,
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
          appendDataCells(itemRow, item);
          itemRow.addEventListener("click", () =>
            handleRowSelection(itemRow, item)
          );
          itemsBody.appendChild(itemRow);
        });
      });
    });
  });
};

const groupHorseItems = (items) => {
  const grouped = {};
  items.forEach((item) => {
    const key = (item.slot_subcategory || "torso").toLowerCase();
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(item);
  });
  return grouped;
};

const groupWeaponItems = (items) => {
  const grouped = {};
  items.forEach((item) => {
    const type = deriveWeaponType(item);
    if (!grouped[type]) {
      grouped[type] = [];
    }
    grouped[type].push(item);
  });
  return grouped;
};

const renderHorseTable = (items) => {
  const grouped = groupHorseItems(items);
  const orderedCategories = [
    ...HORSE_CATEGORY_ORDER,
    ...Object.keys(grouped).filter(
      (cat) => !HORSE_CATEGORY_ORDER.includes(cat)
    ),
  ];

  orderedCategories.forEach((categoryKey) => {
    const entries = grouped[categoryKey];
    if (!entries) return;

    const catId = `horse-${categoryKey}`;
    const catOpen = state.openCategories.has(catId);
    const catLabel = HORSE_CATEGORY_LABELS[categoryKey] ?? categoryKey;
    const catIcon = selectIconFromCandidates(
      entries.map(getItemIconCandidates)
    );
    const catRow = createGroupRow({
      label: catLabel,
      count: entries.length,
      iconSrc: catIcon,
      iconAlt: `${catLabel} icon`,
      onClick: () => toggleCategory(catId),
      className: `group-row category-row ${catOpen ? "expanded" : "collapsed"}`,
    });
    itemsBody.appendChild(catRow);

    const variantGroups = buildVariantGroups(entries);
    variantGroups.forEach((group) => {
      const variantKey = `${catId}::variant::${group.key}`;
      const variantOpen = state.openVariants.has(variantKey);
      const variantItemIcons = group.items
        .map((item) => item.icon)
        .filter(Boolean);
      const variantIcon = selectIconFromCandidates(
        group.items.map(getItemIconCandidates),
        { allowDisallowedFallback: true }
      );

      const variantRow = createVariantRow({
        label: group.label,
        count: group.items.length,
        iconSrc: variantIcon,
        iconFallbacks: variantItemIcons,
        onClick: () => toggleVariant(variantKey),
        className: [
          "group-row",
          "variant-row",
          catOpen ? "" : "hidden-row",
          variantOpen ? "expanded" : "collapsed",
        ]
          .filter(Boolean)
          .join(" "),
      });
      variantRow.dataset.parent = catId;
      itemsBody.appendChild(variantRow);

      group.items.forEach((item) => {
        const itemRow = document.createElement("tr");
        itemRow.className = [
          "item-row",
          catOpen && variantOpen ? "" : "hidden-row",
        ]
          .filter(Boolean)
          .join(" ");
        itemRow.dataset.parent = variantKey;
        appendDataCells(itemRow, item);
        itemRow.addEventListener("click", () =>
          handleRowSelection(itemRow, item)
        );
        itemsBody.appendChild(itemRow);
      });
    });
  });
};

const renderWeaponsTable = (items) => {
  const grouped = groupWeaponItems(items);
  const orderedTypes = [
    ...WEAPON_TYPE_ORDER.filter((type) => grouped[type]),
    ...Object.keys(grouped).filter((type) => !WEAPON_TYPE_ORDER.includes(type)),
  ];

  orderedTypes.forEach((typeKey) => {
    const entries = grouped[typeKey];
    if (!entries) return;

    const catId = `weapon-${typeKey}`;
    const catOpen = state.openCategories.has(catId);
    const catLabel = formatWeaponTypeLabel(typeKey);
    const catIcon = selectIconFromCandidates(
      entries.map(getItemIconCandidates)
    );

    const catRow = createGroupRow({
      label: catLabel,
      count: entries.length,
      iconSrc: catIcon,
      iconAlt: `${catLabel} icon`,
      onClick: () => toggleCategory(catId),
      className: `group-row category-row ${catOpen ? "expanded" : "collapsed"}`,
    });
    itemsBody.appendChild(catRow);

    const variantGroups = buildVariantGroups(entries);
    variantGroups.forEach((group) => {
      const variantKey = `${catId}::variant::${group.key}`;
      const variantOpen = state.openVariants.has(variantKey);
      const variantIcon =
        group.icon && group.icon !== FALLBACK_ICON_SRC ? group.icon : catIcon;
      const fallbackIcons = [
        ...group.items.map((item) => item.icon).filter(Boolean),
      ];
      if (catIcon && !fallbackIcons.includes(catIcon)) {
        fallbackIcons.push(catIcon);
      }
      const variantRow = createVariantRow({
        label: group.label,
        count: group.items.length,
        iconSrc: variantIcon || FALLBACK_ICON_SRC,
        iconFallbacks: fallbackIcons,
        onClick: () => toggleVariant(variantKey),
        className: [
          "group-row",
          "variant-row",
          catOpen ? "" : "hidden-row",
          variantOpen ? "expanded" : "collapsed",
        ]
          .filter(Boolean)
          .join(" "),
      });
      variantRow.dataset.parent = catId;
      itemsBody.appendChild(variantRow);

      group.items.forEach((item) => {
        const itemRow = document.createElement("tr");
        itemRow.className = [
          "item-row",
          catOpen && variantOpen ? "" : "hidden-row",
        ]
          .filter(Boolean)
          .join(" ");
        itemRow.dataset.parent = variantKey;
        appendDataCells(itemRow, item);
        itemRow.addEventListener("click", () =>
          handleRowSelection(itemRow, item)
        );
        itemsBody.appendChild(itemRow);
      });
    });
  });
};

const updateStatusMessage = ({
  totalCount,
  visibleCount,
  placeholderHidden,
  questHidden,
  priceHidden,
}) => {
  if (!totalCount) {
    statusMessage.textContent = "No items found. Try a different search.";
    return;
  }
  const parts = [`${visibleCount} item(s) loaded`];
  if (state.hidePlaceholders && placeholderHidden > 0) {
    parts.push(`${placeholderHidden} NPC item(s) hidden`);
  }
  if (state.hideQuestItems && questHidden > 0) {
    parts.push(`${questHidden} quest item(s) hidden`);
  }
  if (state.hideNoPrice && priceHidden > 0) {
    parts.push(`${priceHidden} price-less item(s) hidden`);
  }
  statusMessage.textContent = parts.join(", ");
};

const buildQuery = () => {
  const params = new URLSearchParams();
  if (state.search) params.set("search", state.search);
  params.set("sort", state.sort);
  params.set("direction", state.direction);
  if (state.itemType === "horse") {
    params.set("item_type", "horse");
  } else if (state.itemType === "armor") {
    params.delete("item_type");
  } else {
    params.set("item_type", state.itemType);
  }
  return params.toString();
};

const fetchItems = async (resetState = false) => {
  statusMessage.textContent = "Loading items...";
  try {
    const response = await fetch(`/api/items?${buildQuery()}`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
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

tabButtons.forEach((button) => {
  if (button.classList.contains("disabled")) return;
  button.addEventListener("click", () => {
    const selectedTab = button.dataset.tab;
    if (state.itemType === selectedTab) return;
    saveTabPreferences(state.itemType);
    ensureTabPreferences(selectedTab);
    state.itemType = selectedTab;
    tabButtons.forEach((btn) => {
      const isActive = btn.dataset.tab === selectedTab;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    applyTabPreferences(selectedTab);
    buildTableHeader();
    requestItems(true);
  });
});

if (hidePlaceholderToggle) {
  hidePlaceholderToggle.checked = state.hidePlaceholders;
  hidePlaceholderToggle.addEventListener("change", (event) => {
    state.hidePlaceholders = event.target.checked;
    renderRows(state.items);
  });
}

if (hideQuestToggle) {
  hideQuestToggle.checked = state.hideQuestItems;
  hideQuestToggle.addEventListener("change", (event) => {
    state.hideQuestItems = event.target.checked;
    renderRows(state.items);
  });
}

if (hideNoPriceToggle) {
  hideNoPriceToggle.checked = state.hideNoPrice;
  hideNoPriceToggle.addEventListener("change", (event) => {
    state.hideNoPrice = event.target.checked;
    renderRows(state.items);
  });
}

if (copyCheatButton) {
  copyCheatButton.addEventListener("click", copySelectedCheat);
  updateCopyButton();
}

ensureTabPreferences("armor");
ensureTabPreferences("horse");
ensureTabPreferences("weapon");
applyTabPreferences(state.itemType);

buildTableHeader();
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
  td.colSpan = getColumnCount();
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


function saveTabPreferences(tab) {
  tabPreferences.set(tab, {
    search: state.search,
    hidePlaceholders: state.hidePlaceholders,
    hideQuestItems: state.hideQuestItems,
    hideNoPrice: state.hideNoPrice,
  });
}

function applyTabPreferences(tab) {
  const prefs = ensureTabPreferences(tab);
  state.search = prefs.search;
  state.hidePlaceholders = prefs.hidePlaceholders;
  state.hideQuestItems = prefs.hideQuestItems;
  state.hideNoPrice = prefs.hideNoPrice;
  searchInput.value = state.search;
  hidePlaceholderToggle.checked = state.hidePlaceholders;
  hideQuestToggle.checked = state.hideQuestItems;
  if (hideNoPriceToggle) {
    hideNoPriceToggle.checked = state.hideNoPrice;
  }
}
