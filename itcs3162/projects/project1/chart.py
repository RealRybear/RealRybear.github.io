import pandas as pd
import matplotlib.pyplot as plt
import re
import numpy as np

# --------------------------------------------------------
#  LOAD DATA
# --------------------------------------------------------
file_path = "all_mtg_cards.csv"
df = pd.read_csv(file_path)

# --------------------------------------------------------
#  PARSE MANA_COST INTO AN INTEGER
# --------------------------------------------------------
def parse_mana_cost(mc):

    if not isinstance(mc, str):
        return float('nan')
    symbols = re.findall(r"\{([^}]*)\}", mc)
    total = 0
    for symbol in symbols:
        try:
            total += int(symbol)
        except ValueError:
            if symbol.upper() in ['W','U','B','R','G']:
                total += 1
    return total

df['x_mana_cost'] = df['mana_cost'].apply(parse_mana_cost)

# --------------------------------------------------------
#  CONVERT POWER TO NUMERIC
# --------------------------------------------------------
df['power'] = pd.to_numeric(df['power'], errors='coerce')

# --------------------------------------------------------
#  FILTER
# --------------------------------------------------------
df = df.dropna(subset=['x_mana_cost', 'power'])
df = df[(df['x_mana_cost'] >= 0) & (df['x_mana_cost'] <= 12)]
df = df[(df['power'] >= 0) & (df['power'] <= 12)]

print(f"Total cards (before set filtering): {len(df)}")

# --------------------------------------------------------
#   '2011' VS. '2024' & FILTER
# --------------------------------------------------------
sets_2011 = ["MBS", "NPH", "M12", "ISD"]
sets_2024 = ["RRM", "MKM", "RCE", "FAL", "OTJ", "MH3", "ACD", "BLB", "DMH", "FDN"]

df_2011 = df[df['set'].isin(sets_2011)]
df_2024 = df[df['set'].isin(sets_2024)]

print(f"2011 cards plotted: {len(df_2011)}")
print(f"2024 cards plotted: {len(df_2024)}")

# --------------------------------------------------------
#  SCATTER PLOT
# --------------------------------------------------------
plt.figure(figsize=(12, 8))

#2011 sets in yellow
if not df_2011.empty:
    plt.scatter(
        df_2011['x_mana_cost'],
        df_2011['power'],
        c='yellow',
        edgecolors='black',
        alpha=0.8,
        s=70,  # marker size
        label="2011 (MBS, NPH, M12, ISD)"
    )

#2024 sets in orange
if not df_2024.empty:
    plt.scatter(
        df_2024['x_mana_cost'],
        df_2024['power'],
        c='orange',
        edgecolors='black',
        alpha=0.8,
        s=70,
        label="2024 (RRM, MKM, RCE, FAL, OTJ, MH3, ACD, BLB, DMH, FDN)"
    )

# --------------------------------------------------------
#  AXES FROM 0 TO 12, TICK MARKS EVERY 2
# --------------------------------------------------------
plt.xlim(0, 14)
plt.ylim(0, 14)
ticks = range(0, 13, 2)  # 0, 2, 4, 6, 8, 10, 12
plt.xticks(ticks)
plt.yticks(ticks)

# --------------------------------------------------------
#  LABELS, TITLE, GRID
# --------------------------------------------------------
plt.xlabel("Parsed Mana Cost (0–12)")
plt.ylabel("Power (0–12)")
plt.title("MTG Cards: 2011 (Yellow) vs. 2024 (Orange)")
plt.grid(True)

# --------------------------------------------------------
#  LEGEND BELOW THE PLOT
# --------------------------------------------------------
plt.legend(
    title="Year & Sets",
    bbox_to_anchor=(0.5, -0.2),
    loc="upper center",
    ncol=1,
    fontsize=9
)

plt.tight_layout()
plt.subplots_adjust(bottom=0.25)

plt.show()
