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
    revalidate: 1,
  };
}

export default function RecipeDetails({ recipe }) {
  console.log(recipe);
  // console.log(recipe.fields.imagesOthers[0].fields.file.url);
  const {
    title,
    cookingTime,
    thumbnail,
    featuredImage,
    ingredients,
    imagesOthers,
  } = recipe.fields;

  // const {
  //   0: { fields },
  // } = imagesOthers;
  // console.log(fields.file.url);

  // // const imageArray = [...imagesOthers];

  // // let i = 0;
  // // while (i <= imageArray.length) {
  // //   console.log(imagesOthers[i].fields.file.url);
  // //   i++;
  // // }

  return (
    <div>
      <h3>{title}</h3>
      <Image
        src={"https:" + featuredImage.fields.file.url}
        width={featuredImage.fields.file.details.image.width}
        height={featuredImage.fields.file.details.image.height}
      />

      <div>
        <h3>ingredients</h3>
        <ol>
          {ingredients.map((ingredient) => {
            return <li key={ingredient}>{ingredient}</li>;
          })}
        </ol>
      </div>

      <div>
        <h3>ingredients</h3>
        <ol>{}</ol>
      </div>

      <div>{imagesOthers[0].fields.file.url}</div>
    </div>
  );
}
