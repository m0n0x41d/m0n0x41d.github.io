import typer
from typing import Annotated
from datetime import datetime
import textwrap
import random

cli = typer.Typer()

COLORS = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
]


def main(
    post_title: Annotated[
        str,
        typer.Option(
            prompt=True,
            help="Post title used for filename and Title in front matter",
        ),
    ],
    tags: Annotated[
        str,
        typer.Option(
            prompt="Tags (comma separated)",
            help="Tags to be added in front matter",
        ),
    ],
    source_file_path: Annotated[
        str,
        typer.Option(help="Path to markdown blog post source markdown file"),
    ] = "./new.md",
    post_description: Annotated[
        str, typer.Option(help="Description for blog post to be added in front matter")
    ] = "No description for this, read the post!",
):
    # TODO: Delete these prints
    print(source_file_path)
    print(post_title)
    print(generate_filename(post_title))

    new_post_file_name = generate_filename(post_title)

    front_matter = get_front_matter(
        title=post_title,
        tags=comma_str_to_list(tags),
        style="border",
        color=random.choice(COLORS),
        description=post_description,
    )

    make_post_file(
        new_post_filename=new_post_file_name,
        front_matter=front_matter,
        source_filepath=source_file_path,
    )


def comma_str_to_list(input_str: str):
    res = input_str.split(",")
    return res


def generate_filename(title: str):
    return f"{datetime.now().date()}-{title.replace(' ', '-')}.md"


def get_front_matter(
    title: str,
    tags: list[str] | str,
    color: str,
    description: str,
    style: str = "border",
) -> str:
    tags_string = ""
    tags_string += "["
    tags_count = len(tags) - 1

    for index, tag in enumerate(tags):
        tags_string += tag
        if index < tags_count:
            tags_string += ", "
    tags_string += "]"

    front_matter = f"""
    ---
    title: {title}
    tags: {tags_string}
    style: {style}
    color: {color}
    description: {description}
    ---
    """
    return textwrap.dedent(front_matter)


def make_post_file(
    new_post_filename: str,
    front_matter: str,
    source_filepath: str,
):
    with open(source_filepath, "r") as file:
        content = file.read()
        front_matter = front_matter.lstrip()
        new_post = front_matter + "\n" + content
        with open(new_post_filename, "w") as post:
            post.write(new_post)


if __name__ == "__main__":
    typer.run(main)
