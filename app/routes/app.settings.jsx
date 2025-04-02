import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  TextField,
  useBreakpoints,
  Divider,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";

// import prisma db
import db from "../db.server";

export async function loader() {
  // simulate load from database
  // let settings = {
  //   name: "Coolest App Ever",
  //   description: "My first Shopify app example running in Remix",
  // };

  let settings = await db.settings.findFirst();

  console.log("settings from db ---->", settings);

  return json(settings);
}

export async function action({ request }) {
  let settings = await request.formData();
  settings = Object.fromEntries(settings);

  await db.settings.upsert({
    where: {
      id: "1",
    },
    update: {
      id: "1",
      name: settings.name,
      description: settings.description,
    },
    create: {
      id: "1",
      name: settings.name,
      description: settings.description,
    },
  });

  return json(settings);
}

export default function SettingsPage() {
  const settings = useLoaderData();
  const { smUp } = useBreakpoints();
  const [formState, setFormState] = useState(settings);

  return (
    <Page>
      <TitleBar title="Settings" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                App Information
              </Text>
              <Text as="p" variant="bodyMd">
                Please add the required information for your app!
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="POST">
              <BlockStack gap="400">
                <TextField
                  name="name"
                  label="App Name"
                  value={formState?.name}
                  onChange={(value) =>
                    setFormState({ ...formState, name: value })
                  }
                />
                <TextField
                  name="description"
                  label="Description"
                  value={formState?.description}
                  onChange={(value) =>
                    setFormState({ ...formState, description: value })
                  }
                />
                <Button submit={true}>Save</Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
        {smUp ? <Divider /> : null}
      </BlockStack>
    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
