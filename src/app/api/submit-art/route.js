export async function POST(request) {
  try {
    const formData = await request.formData();

    const payload = formData.get("payload_json");
    const file = formData.get("file");

    const discordForm = new FormData();

    discordForm.append("payload_json", payload);

    if (file) {
      discordForm.append("file", file);
    }

    const response = await fetch(
      process.env.ART_SUBMISSION_WEBHOOK,
      {
        method: "POST",
        body: discordForm,
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: "Discord submission failed" },
        { status: 500 }
      );
    }

    return Response.json(
      { success: true },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}