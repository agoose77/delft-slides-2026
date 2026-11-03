{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };
  outputs = {
    self,
    nixpkgs,
  }: let
    forAllSystems =
      nixpkgs.lib.genAttrs nixpkgs.lib.systems.flakeExposed;
  in {
    devShells =
      forAllSystems
      (
        system: let
          pkgs = import nixpkgs {
            inherit system;
          };
        in
          with pkgs; {
            default = mkShell {
              buildInputs = [
                pkgs.nodejs_26
                pkgs.mystmd
                (pkgs.python3.withPackages (ps:
                  with ps; [
                    jupyter-server
                    ipykernel
                    # Computation modules
                    jupytext
                    matplotlib
                    numpy
                  ]))
                pkgs.libwebp
                pkgs.imagemagick
                pkgs.typst
              ];
            };
          }
      );
  };
}
