// Embeds every chart on the page with vega-embed.
// Each chart's JSON specification lives in /specs so it can be read on its own.

const theme = {
  background: null,
  font: "Nunito Sans, Segoe UI, Helvetica, Arial, sans-serif",
  view: { stroke: null },
  axis: {
    labelFont: "Nunito Sans, Segoe UI, Helvetica, Arial, sans-serif",
    titleFont: "Nunito Sans, Segoe UI, Helvetica, Arial, sans-serif",
    labelFontSize: 12,
    titleFontSize: 12.5,
    titleFontWeight: 700,
    labelColor: "#4A453F",
    titleColor: "#4A453F",
    domainColor: "#C9C1B5",
    tickColor: "#C9C1B5",
    gridColor: "#EDE8E0",
    gridWidth: 1
  },
  legend: {
    labelFont: "Nunito Sans, Segoe UI, Helvetica, Arial, sans-serif",
    titleFont: "Nunito Sans, Segoe UI, Helvetica, Arial, sans-serif",
    labelFontSize: 12.5,
    titleFontSize: 12.5,
    titleFontWeight: 800,
    labelColor: "#2B2722",
    titleColor: "#2B2722"
  },
  header: { labelFont: "Nunito Sans, Segoe UI, Helvetica, Arial, sans-serif", titleFont: "Nunito Sans, Segoe UI, Helvetica, Arial, sans-serif", labelColor: "#2B2722" },
  text: { font: "Nunito Sans, Segoe UI, Helvetica, Arial, sans-serif" },
  title: { font: "Fraunces" }
};

// [element id, spec file]
const charts = [
  ["#c01", "specs/c01_national_trend.vg.json"],
  ["#c02", "specs/c02_waterfall.vg.json"],
  ["#c03", "specs/c03_treemap.vg.json"],
  ["#c04", "specs/c04_marimekko.vg.json"],
  ["#c05", "specs/c05_slope_euthanasia.vg.json"],
  ["#c06", "specs/c06_choropleth.vg.json"],
  ["#c07", "specs/c07_dot_density.vg.json"],
  ["#c08", "specs/c08_dumbbell.vg.json"],
  ["#c09", "specs/c09_heatmap_reasons.vg.json"],
  ["#c10", "specs/c10_butterfly.vg.json"],
  ["#c11", "specs/c11_proportional_symbols.vg.json"],
  ["#c12", "specs/c12_connected_scatter.vg.json"],
  ["#c13", "specs/c13_prosecutions_by_state.vg.json"]
];

async function embedAll() {
  // wait for web fonts so chart labels are measured with the right typeface
  if (document.fonts && document.fonts.ready) {
    try { await document.fonts.ready; } catch (e) { /* continue anyway */ }
  }
  for (const [el, url] of charts) {
    const target = document.querySelector(el);
    if (!target) continue;
    const opts = { actions: false, renderer: "svg", config: theme };
    // The treemap is a full Vega spec, so give it the card's width explicitly
    if (url.includes("treemap")) {
      opts.width = Math.max(320, Math.floor(target.clientWidth));
    }
    vegaEmbed(el, url, opts).catch((err) => {
      target.innerHTML = '<p style="color:#9A5C00">Chart failed to load: ' + err.message + "</p>";
      console.error(url, err);
    });
  }
}

embedAll();
