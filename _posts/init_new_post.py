#!/usr/bin/env python

import click
from datetime import datetime


@click.command()
@click.option(
    "-pt",
    "--post-title",
    prompt="Post name",
    help="Name that that used in filename and as Title in front matter",
)
def get_post_title(post_title: str):
    click.echo(post_title)
    return post_title


def generate_filename(title: str):
    print("is this even called?")
    return f"{datetime.now().date()}-{title.replace(' ', '-')}.md"


if __name__ == "__main__":
    post_name = get_post_title()
    # filename = generate_filename(title=post_name)
    # print("This will be the filename: " + filename)
