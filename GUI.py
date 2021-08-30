import tkinter as tk

from rearrange import rearrange
from download import download

root = tk.Tk()
root.title("Music Utils")

canvas = tk.Canvas(root, height=200, width=400, bg="#eee").pack()

rearrange_button = tk.Button(
    canvas, text="Rearrange", padx=10, pady=5, fg="black", bg="white", command=rearrange).pack()


link_input = tk.Entry(canvas)
link_input.pack()


def download_on_click():
    link = link_input.get()
    if not link:
        return
    download(link)


download_button = tk.Button(
    canvas, text="download", padx=10, pady=5, fg="black", bg="white",
    command=download_on_click)

download_button.pack()


root.mainloop()
