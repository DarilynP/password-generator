cat > script.js << 'EOF'
function generatePassword(length, options) {
  const { lowercase, uppercase, numbers, symbols } = options;

  let chars = "";
  if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
  if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (numbers) chars += "0123456789";
  if (symbols) chars += "!@#$%^&*()_+[]{}<>?,./";

  if (!chars) return "Select at least one option.";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}

document.getElementById("generateBtn").addEventListener("click", () => {
  const length = parseInt(document.getElementById("length").value, 10);

  const password = generatePassword(length, {
    lowercase: document.getElementById("lowercase").checked,
    uppercase: document.getElementById("uppercase").checked,
    numbers: document.getElementById("numbers").checked,
    symbols: document.getElementById("symbols").checked,
  });

  document.getElementById("passwordOutput").textContent = password;
  document.getElementById("statusText").textContent = "";
});

document.getElementById("copyBtn").addEventListener("click", async () => {
  const text = document.getElementById("passwordOutput").textContent.trim();
  if (!text || text === "Your password will appear here") return;

  try {
    await navigator.clipboard.writeText(text);
    document.getElementById("statusText").textContent = "Copied to clipboard ✅";
  } catch {
    document.getElementById("statusText").textContent = "Copy failed — copy manually.";
  }
});
EOF
