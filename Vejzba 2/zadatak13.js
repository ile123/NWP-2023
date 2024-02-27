function getGlagol(imenica) {
  const glagoli = {
    jabuka: "jede",
    macka: "trči",
    auto: "vozi",
  };

  return glagoli[imenica] || "radi nešto";
}

async function ispisRecenice(imenica) {
  const glagol = await getGlagol(imenica);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  console.log(`Imenica: ${imenica}, Glagol: ${glagol}`);
}

ispisRecenice("jabuka");
