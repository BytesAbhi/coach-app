<?php

namespace App\Filament\Resources\CoachLoginResource\Pages;

use App\Filament\Resources\CoachLoginResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCoachLogin extends EditRecord
{
    protected static string $resource = CoachLoginResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }
}
