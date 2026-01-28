<template>
  <section class="rules">
    <header class="hero">
      <h1>Community Rules & Compliance Framework</h1>
      <p>
        These standards ensure a safe, fair and immersive Australian role-play environment.
        By participating in the server, you agree to comply with all policies outlined below.
      </p>
    </header>

    <!-- GENERAL CONDUCT -->
    <div class="rule-section">
      <h2>1. General Conduct Requirements</h2>
      <ul>
        <li>All players must behave respectfully and responsibly at all times.</li>
        <li>Harassment, discrimination, bullying or hate speech is strictly prohibited.</li>
        <li>Exploiting bugs, vulnerabilities or unintended mechanics is not permitted.</li>
        <li>Staff directions must be followed promptly and respectfully.</li>
        <li>Impersonation of staff, emergency services or government entities is not allowed.</li>
      </ul>
    </div>

    <!-- ROLE-PLAY STANDARDS -->
    <div class="rule-section">
      <h2>2. Role-play Standards & Expectations</h2>
      <ul>
        <li>Players must remain in character unless in a designated OOC area.</li>
        <li>FailRP, including unrealistic behavior or ignoring injuries, is prohibited.</li>
        <li>Power gaming (forcing outcomes on others) is not permitted.</li>
        <li>Meta gaming (using information your character wouldn’t know) is prohibited.</li>
        <li>Characters must value their life realistically and proportionately.</li>
        <li>New Life Rule (NLR): Events leading to character death must be forgotten.</li>
      </ul>
    </div>

    <!-- CRIME & FORCE -->
    <div class="rule-section">
      <h2>3. Criminal Activity & Use of Force</h2>
      <ul>
        <li>RDM and VDM are strictly prohibited.</li>
        <li>Criminal RP must be realistic, justified and proportionate.</li>
        <li>Hostage situations require negotiation and structured escalation.</li>
        <li>Use of force must be justified within RP context.</li>
        <li>Baiting police or provoking unnecessary conflict is not acceptable.</li>
        <li>Firearms must be used responsibly and realistically.</li>
      </ul>
    </div>

    <!-- VEHICLE RULES -->
    <div class="rule-section">
      <h2>4. Vehicle Operation & Road Conduct</h2>
      <ul>
        <li>Driving behavior should reflect Australian road rules unless justified by RP.</li>
        <li>Vehicles must not be used as weapons except in extreme, justified scenarios.</li>
        <li>Emergency vehicle theft requires strong RP justification.</li>
        <li>Road laws should be followed unless fleeing or engaged in crime.</li>
        <li>Blocking roads or griefing with vehicles is prohibited.</li>
      </ul>
    </div>

    <!-- EMERGENCY SERVICES -->
    <div class="rule-section">
      <h2>5. Emergency Services Interaction</h2>
      <ul>
        <li>Do not interfere with active emergency scenes unless involved.</li>
        <li>Downed players must receive appropriate medical RP.</li>
        <li>Looting or robbing incapacitated players is prohibited.</li>
        <li>EMS decisions regarding treatment are final.</li>
      </ul>
    </div>

    <!-- ECONOMY -->
    <div class="rule-section">
      <h2>6. Employment, Economy & Business Conduct</h2>
      <ul>
        <li>Exploiting job payouts or business mechanics is prohibited.</li>
        <li>Businesses must operate ethically and realistically.</li>
        <li>Scams must be roleplayed and must not target new players.</li>
        <li>Money transfers must be justified within RP.</li>
        <li>Artificial inflation or manipulation of the economy is not permitted.</li>
      </ul>
    </div>

    <!-- STREAMING -->
    <div class="rule-section">
      <h2>7. Streaming, Recording & Privacy</h2>
      <ul>
        <li>Stream sniping is strictly prohibited.</li>
        <li>Personal information must not be disclosed on stream.</li>
        <li>Players must respect privacy when recording interactions.</li>
        <li>All content must comply with Twitch, YouTube and Australian digital safety standards.</li>
      </ul>
    </div>

    <!-- STAFF -->
    <div class="rule-section">
      <h2>8. Staff Interaction & Compliance</h2>
      <ul>
        <li>Staff decisions are final and must be respected.</li>
        <li>Arguments during staff sits are not permitted; appeals may be lodged afterwards.</li>
        <li>Spamming tickets or abusing support channels is prohibited.</li>
        <li>False reports or malicious complaints will result in disciplinary action.</li>
      </ul>
    </div>

    <!-- CONSEQUENCES -->
    <div class="rule-section">
      <h2>9. Enforcement & Disciplinary Measures</h2>
      <ul>
        <li>Penalties may include warnings, fines, kicks, bans or character wipes.</li>
        <li>Severity is determined by intent, impact and prior history.</li>
        <li>Repeat offenders will face escalating consequences.</li>
        <li>Staff may act on conduct not explicitly listed if it undermines community standards.</li>
      </ul>
    </div>

    <!-- FINES -->
    <div class="rule-section penalties">
      <h2>10. Offense Schedule – Fines & Detention</h2>
      <p class="section-desc">Penalties reflect a structured, fair and realistic Australian enforcement model.</p>

      <table class="fine-table">
  <thead>
    <tr>
      <th>Offense</th>
      <th>Description</th>
      <th>Fine</th>
      <th>Detention</th>
    </tr>
  </thead>

  <tbody>
    <tr v-for="fine in fines" :key="fine.title">
      <td>{{ fine.title }}</td>
      <td>{{ fine.desc }}</td>
      <td>${{ fine.amount.toLocaleString() }}</td>
      <td>{{ fine.jail ? fine.jail + ' mins' : '—' }}</td>
    </tr>
  </tbody>
</table>

    </div>

    <!-- PROHIBITED ACTIONS -->
    <div class="rule-section forbidden">
      <h2>11. Prohibited Conduct (Zero‑Tolerance)</h2>
      <p class="section-desc">These actions may result in immediate removal or long‑term sanctions.</p>

      <ul>
        <li>Use of cheats, macros, automation or external modifications.</li>
        <li>Combat logging or disconnecting to avoid consequences.</li>
        <li>Spamming voice, text or emergency channels.</li>
        <li>Abuse of job powers (police, EMS, mechanic, etc.).</li>
        <li>Targeting or exploiting new players.</li>
        <li>Hate speech, extremist content or slurs.</li>
        <li>Advertising other servers or communities.</li>
        <li>Any conduct breaching Australian law or digital safety standards.</li>
      </ul>
    </div>

    <!-- BAN DURATIONS -->
    <div class="rule-section bans">
      <h2>12. Sanction Framework (“Vacation Time”)</h2>
      <p class="section-desc">Standardized ban durations for repeated breaches.</p>

<table class="ban-table">
  <thead>
    <tr>
      <th>Offense</th>
      <th>First Breach</th>
      <th>Second Breach</th>
      <th>Third Breach</th>
    </tr>
  </thead>

  <tbody>
    <tr v-for="ban in bans" :key="ban.offense">
      <td>{{ ban.offense }}</td>
      <td>{{ ban.first }}</td>
      <td>{{ ban.second }}</td>
      <td>{{ ban.third }}</td>
    </tr>
  </tbody>
</table>

    <footer class="footer-note">
      <p>By entering the server, you acknowledge and accept all rules and enforcement procedures.</p>
      <p>Policies may be updated at any time to maintain safety, fairness and compliance.</p>
    </footer>
  </div>
  </section>
</template>

<script setup lang="ts">
const fines = [
  { title: "Speeding", desc: "Exceeding posted speed limits.", amount: 1500, jail: 0 },
  { title: "Reckless Driving", desc: "Dangerous or negligent vehicle operation.", amount: 3500, jail: 5 },
  { title: "Evading Police", desc: "Fleeing lawful direction.", amount: 5000, jail: 10 },
  { title: "Illegal Firearm Possession", desc: "Possession of unlicensed weapons.", amount: 7500, jail: 15 },
  { title: "Drug Possession", desc: "Possession of prohibited substances.", amount: 6000, jail: 12 },
  { title: "Assault", desc: "Physical harm to another player.", amount: 4500, jail: 8 },
  { title: "Robbery", desc: "Theft from persons or businesses.", amount: 9000, jail: 20 },
  { title: "Grand Theft Auto", desc: "Theft of a motor vehicle.", amount: 4000, jail: 6 }
]

const bans = [
  { offense: "RDM / VDM", first: "3 Days", second: "7 Days", third: "Permanent" },
  { offense: "FailRP", first: "24 Hours", second: "3 Days", third: "7 Days" },
  { offense: "Meta gaming", first: "3 Days", second: "7 Days", third: "Permanent" },
  { offense: "Power gaming", first: "3 Days", second: "7 Days", third: "Permanent" },
  { offense: "Hate Speech", first: "Permanent", second: "Permanent", third: "Permanent" },
  { offense: "Cheating / Exploits", first: "Permanent", second: "—", third: "—" },
  { offense: "Combat Logging", first: "24 Hours", second: "3 Days", third: "7 Days" },
  { offense: "Staff Disrespect", first: "3 Days", second: "7 Days", third: "Permanent" }
]
</script>

<style scoped>
.rules {
  max-width: 1100px;
  margin: auto;
  padding: 2rem 1.5rem;
  color: #fff;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.hero p {
  opacity: 0.8;
}

.rule-section {
  margin-bottom: 2.5rem;
  background: rgba(255, 255, 255, 0.04);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(6px);
  transition: 0.2s;
}

.rule-section:hover {
  border-color: #4f8cff;
  transform: translateY(-3px);
}

.rule-section h2 {
  margin-bottom: 1rem;
  color: #4f8cff;
}

.rule-section ul {
  list-style: none;
  padding: 0;
}

.rule-section li {
  margin-bottom: 0.6rem;
  opacity: 0.9;
}

.section-desc {
  opacity: 0.75;
  margin-bottom: 1rem;
}

/* TABLES */
.fine-table,
.ban-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.fine-table th,
.fine-table td,
.ban-table th,
.ban-table td {
  padding: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.fine-table th,
.ban-table th {
  background: rgba(255, 255, 255, 0.08);
  color: #4f8cff;
}

.fine-table tr:nth-child(even),
.ban-table tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.03);
}

.footer-note {
  text-align: center;
  margin-top: 3rem;
  opacity: 0.7;
}
</style>
