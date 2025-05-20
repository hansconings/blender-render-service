import bpy
import sys
import json

argv = sys.argv
argv = argv[argv.index("--") + 1:]  # Arguments after '--'

specs_json = argv[0]
output_file = argv[1]

specs = json.loads(specs_json)

# Hier kun je de specs gebruiken om je Blender model aan te passen.
# Dit is een dummy voorbeeld dat alleen de render uitvoert.

bpy.context.scene.render.filepath = output_file
bpy.ops.render.render(write_still=True)