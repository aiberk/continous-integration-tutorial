import { createClient } from "contentful";
import Image from "next/image";
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "recipe",
  });

  // Makes an array with slugs from the res const.
  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "recipe",
    "fields.slug": params.slug,
  });

  return {
    props: { recipe: items[0] },
  };
}

export default function RecipeDetails({ recipe }) {
  console.log(recipe);
  const { title, slug, cookingTime, thumbnail, featuredImage } = recipe.fields;
  console.log(title);
  return (
    <div>
      <h3>{title}</h3>
      <h3>{featuredImage.fields.file.url}</h3>
      <Image
        src={"https:" + featuredImage.fields.file.url}
        width={featuredImage.fields.file.details.image.width}
        height={featuredImage.fields.file.details.image.height}
      />
    </div>
  );
}
