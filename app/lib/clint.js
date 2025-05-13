import sanityClint from "@sanity/client";
import imageBuilder from "@sanity/image-url";
export const clint = sanityClint({
    projectId: "mhop4d4n",
    dataset: "production",
    apiVersion: "2025-03-28",
    useCdn: true,
    token: "skp1pDI9zbUL5sRqosiQb6c1p7E86wVzSEQJHExY2DgtwTeapAsPpIjoHVg2mXZXWuEYl5J08rVHYn3CpOObZtNfd4IamCny2yLD93BvG0g3FYoPtG6dnZ9YUKgVar8yg95GiTVhWRU04hI6STIFifF7kfRdHjaVmv6AX0Pi9o1rEbH4VrZG",
});
const builder = imageBuilder(clint);
export const urlFor = (source) => builder.image(source);
