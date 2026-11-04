{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    dev-python = {
      url = "github:agoose77/dev-flakes/v16?dir=python";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };
  outputs = {
    self,
    nixpkgs,
    dev-python,
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
          python = pkgs.python315;
          venvHook =
            dev-python.packages.${system}.nix-ld-venv-hook.override
            {python = python;};
        in
          with pkgs; {
            default = mkShell {
              venvDir = ".venv";
              packages = [
                pkgs.nodejs_26
                pkgs.mystmd
                python
                venvHook
                pkgs.libwebp
                pkgs.imagemagick
                pkgs.typst
              ];
            };
          }
      );
  };
}
